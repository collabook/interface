import axios from 'axios'
import { messageBus } from './../../main.js'
// const messageBus = require('./../../main.js').messageBus

/*
 * Version Control Stuff
*/

const actions = {
  git_init ({ commit, rootState }) {
    axios.post(`http://localhost:8088/gitinit`, {location: rootState.Book.location})
      .then((res) => {
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  git_add ({ commit, rootState }) {
    axios.post(`http://localhost:8088/gitadd`, {location: rootState.Book.location})
      .then((res) => {
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  git_commit ({ commit, rootState }, message) {
    axios.post(`http://localhost:8088/gitcommit`, {location: rootState.Book.location, message: message})
      .then((res) => {
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  git_remote_add ({ commit, rootState }, {name, url}) {
    axios.post(`http://localhost:8088/gitremoteadd`, {
      location: rootState.Book.location,
      name: name,
      url: url
    })
      .then((res) => {
        // TODO: might have to update the push to and pull from menus or something
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
        // TODO: show prompt with error messageBus
      })
  }
}

export default {
  // state,
  // mutations,
  actions
  // getters
}
