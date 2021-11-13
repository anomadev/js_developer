import Vue from 'vue'
import App from './App.vue'
import ChildComponent from './components/ChildComponent'

Vue.config.productionTip = false
Vue.component('child', ChildComponent)

new Vue({
  render: h => h(App),
}).$mount('#app')
