import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// import util from 'util'

import { ipcRenderer } from 'electron'

Vue.use(Buefy)

export const messageBus = new Vue({})

ipcRenderer.on('newBook', (event) => {
  messageBus.$emit('newBook')
})

ipcRenderer.on('saveBook', (event, location) => {
  messageBus.$emit('saveBook', location)
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
