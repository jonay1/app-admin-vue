import auth from '@/utils/auth'
import api from '@/api/user'
import constantRoutes from '@/router/default'
import dynamicRoutes from '@/router/dynamic'
import router, {resetRouter} from '@/router'

function hasPermission(funcs, route) {
    if (route.meta && route.meta.id) {
        return funcs.includes(route.meta.id)
    } else {
        return true
    }
}

function filterRoutes(routes, funcs) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(funcs, tmp)) {
            if (tmp.children) {
                tmp.children = filterRoutes(tmp.children, funcs)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    token: auth.token(),
    name: '',
    avatar: '',
    funcs: [],
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INFO: (state, info) => {
        Object.assign(state, info)
    },
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    RESET_INFO: (state) => {
        state.token = ''
        state.name = ''
        state.avatar = ''
        state.routes = []
        state.addRoutes = []
        state.funcs = []

    }
}

const actions = {
    generateRoutes({commit}, funcs, isadmin) {
        let accessedRoutes
        if (isadmin) {
            accessedRoutes = dynamicRoutes || []
        } else {
            accessedRoutes = filterRoutes(dynamicRoutes, funcs)
        }
        commit('SET_ROUTES', accessedRoutes)
        return accessedRoutes
    },
    // user login
    login({commit}, userInfo) {
        return api.login(userInfo).then(data => {
            commit('SET_TOKEN', data.token)
            auth.token(data.token)

        }).catch(error => {
        })
    },
    // get user info
    getInfo({commit, state}) {
        return api.getInfo(state.token).then(data => {
            commit('SET_INFO', data)
            return data
        })
    },

    // user logout
    logout({commit, state}) {
        return api.logout().then(() => {
            commit('RESET_INFO')
            auth.clear()
            resetRouter()
        })
    },

    // remove token
    resetToken({commit}) {
        commit('SET_TOKEN', '')
        auth.clear()
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
