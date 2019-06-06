import http from '@/utils/http'

export default {
    login(data) {
        return http.post('/login', data)
    },
    getInfo(token) {
        return http.get('/user/info', {token})
    },
    logout() {
        return http.post('/logout')
    }
}
