import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/_index.less'
import axios from 'axios'
import store from './store'
import plugin from "./lib/export/index"
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(plugin)
Vue.use(ElementUI,{size:'small'})
Vue.config.productionTip = false
Vue.use(Vant)

setTimeout(() => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}, 100)
