import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import wysiwyg from 'vue-wysiwyg'

Vue.use(wysiwyg, {
  hideModules: { 'image': true, 'removeFormat': true }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
