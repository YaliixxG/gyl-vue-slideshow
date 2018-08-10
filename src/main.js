import Vue from 'vue'
import App from './App.vue'
import Slideshow from './lib/gyl-vue-slideshow'

Vue.use(Slideshow)
new Vue({
  el: '#app',
  render: h => h(App)
})
