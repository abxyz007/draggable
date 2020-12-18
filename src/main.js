import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDraggable from 'vue-draggable'

Vue.use(ElementUI)
Vue.use(VueDraggable)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
