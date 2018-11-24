import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// import util from 'util'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { ipcRenderer } from 'electron'

Vue.use(Buefy)

library.add(faFolder, faFile)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export const messageBus = new Vue({})

ipcRenderer.on('newBook', (event) => {
  messageBus.$emit('newBook')
})

ipcRenderer.on('openBook', (event) => {
  messageBus.$emit('openBook')
})

ipcRenderer.on('saveBook', (event) => {
  messageBus.$emit('saveBook')
})

ipcRenderer.on('save', (event) => {
  messageBus.$emit('save')
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
