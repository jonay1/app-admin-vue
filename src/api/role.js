import http from '@/utils/http'

export default {
    list(query) {
        return http.post('/roles', query)
    }
}
