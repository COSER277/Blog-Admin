import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import './styles.scss'
import './assets/normalize.scss'
Vue.use(ElementUI)
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor)

import http from './http.js'
Vue.prototype.$http = http;


Vue.config.productionTip = false
Vue.mixin({
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
