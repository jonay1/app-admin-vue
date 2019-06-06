import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import router from './router'
import store from './store'
import './icons' // icon
import Cookies from 'js-cookie'
import * as filters from './filters' // global filters

Vue.config.productionTip = false
console.log(store)
Vue.use(ElementUI, {
    size: store.getters.size // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
