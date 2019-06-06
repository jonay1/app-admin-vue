import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import auth from '@/utils/auth'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist


export default function filter(router) {

    router.beforeEach(async (to, from, next) => {
        // start progress bar
        NProgress.start()

        // set page title
        document.title = to.meta.title || 'App Admin'

        // determine whether the user has logged in
        const hasToken = auth.token()

        if (hasToken) {
            if (to.path === '/login') {
                // if is logged in, redirect to the home page
                next({path: '/'})
                NProgress.done()
            } else {
                // determine whether the user has obtained his permission roles through getInfo
                const isloaded = store.state.user.funcs && store.state.user.funcs.length > 0;
                if (isloaded) {
                    next()
                } else {
                    try {
                        // get user info
                        const {funcs, name} = await store.dispatch('user/getInfo')

                        // generate accessible routes map based on roles
                        const accessRoutes = await store.dispatch('user/generateRoutes', funcs, name == 'admin')
                        console.log('loading latest routes')
                        console.log(accessRoutes)

                        // dynamically add accessible routes
                        router.addRoutes(accessRoutes)

                        // hack method to ensure that addRoutes is complete
                        // set the replace: true, so the navigation will not leave a history record
                        next({...to, replace: true})
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.dispatch('user/resetToken')
                        Message.error(error || 'Has Error')
                        next(`/login?redirect=${to.path}`)
                        NProgress.done()
                    }
                }
            }
        } else {
            /* has no token*/

            if (whiteList.indexOf(to.path) !== -1) {
                // in the free login whitelist, go directly
                next()
            } else {
                // other pages that do not have permission to access are redirected to the login page.
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
    })

    router.afterEach(() => {
        // finish progress bar
        NProgress.done()
    })
}