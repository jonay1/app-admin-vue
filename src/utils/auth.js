import cookie from 'js-cookie'

const key = '$token-key'

function token(val) {
    if (arguments.length == 0) {
        return cookie.get(key)
    } else {
        cookie.set(key, val)
    }
}

function clear() {
    cookie.remove(key)
}

export default {token, clear}
