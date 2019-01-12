import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// import util from 'util'

import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faFolder, faFile, faFolderPlus, faFolderOpen,
  faSave, faCloud, faCloudDownloadAlt, faCloudUploadAlt,
  faCodeBranch, faEnvelope, faSitemap, faList,
  faEdit, faTags, faColumns, faBook, faBookOpen,
  faBookmark, faTree
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { ipcRenderer } from 'electron'

Vue.use(Buefy)

library.add(
  faFolder, faFile, faFolderPlus, faFolderOpen,
  faSave, faCloud, faCloudDownloadAlt, faCloudUploadAlt,
  faCodeBranch, faEnvelope, faSitemap, faList,
  faEdit, faTags, faColumns, faBook, faBookOpen,
  faBookmark, faTree)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export const messageBus = new Vue({})

// Vue.use(messageBus)
Vue.prototype.$messageBus = messageBus

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

ipcRenderer.on('corkboardView', () => {
  messageBus.$emit('corkboardView')
})

ipcRenderer.on('editorView', () => {
  messageBus.$emit('editorView')
})

ipcRenderer.on('gitInit', () => {
  messageBus.$emit('gitInit')
})

ipcRenderer.on('gitTrack', () => {
  messageBus.$emit('gitTrack')
})

ipcRenderer.on('gitCommit', () => {
  messageBus.$emit('gitCommit')
})

ipcRenderer.on('gitLog', () => {
  messageBus.$emit('gitLog')
})

ipcRenderer.on('gitPush', () => {
  messageBus.$emit('gitPush')
})

ipcRenderer.on('gitPull', () => {
  messageBus.$emit('gitPull')
})
ipcRenderer.on('userSettings', () => {
  messageBus.$emit('userSettings')
})

ipcRenderer.on('gitAddRemote', () => {
  messageBus.$emit('gitAddRemote')
})

ipcRenderer.on('gitCreateBranch', () => {
  messageBus.$emit('gitCreateBranch')
})

ipcRenderer.on('gitSwitchBranch', () => {
  messageBus.$emit('gitSwitchBranch')
})

ipcRenderer.on('gitRebaseContinue', () => {
  messageBus.$emit('gitRebaseContinue')
})

ipcRenderer.on('gitRebase', () => {
  messageBus.$emit('gitRebase')
})

ipcRenderer.on('gitClone', () => {
  messageBus.$emit('gitClone')
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  messageBus,
  template: '<App/>'
}).$mount('#app')
