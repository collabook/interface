import axios from 'axios'
import { messageBus } from './../../main.js'

const state = {
  remotes: [],
  branches: []
}

const mutations = {
  GIT_ADD_REMOTES (state, remotes) {
    state.remotes = remotes
  },

  GIT_ADD_BRANCHES (state, branches) {
    state.branches = branches
  }
}

const actions = {
  git_init ({ commit, rootState }) {
    axios.post(`http://localhost:8088/gitinit`, {location: rootState.Book.location})
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_add ({ commit, rootState }) {
    axios.post(`http://localhost:8088/gitadd`, {location: rootState.Book.location})
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_commit ({ commit, rootState }, message) {
    axios.post(`http://localhost:8088/gitcommit`, {location: rootState.Book.location, message: message})
      .catch((e) => messageBus.$emit('showError', e.response.data))
  },

  git_get_remotes ({ commit, state, rootState }) {
    axios.post(`http://localhost:8088/gitgetremotes`, {location: rootState.Book.location})
      .then(res => commit('GIT_ADD_REMOTES', res.data))
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_remote_add ({ commit, state, rootState }, {name, url}) {
    axios.post(`http://localhost:8088/gitremoteadd`, {
      location: rootState.Book.location,
      name: name,
      url: url
    })
      .then(res => commit('GIT_ADD_REMOTES', [...state.remotes, name]))
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_push ({ commit, dispatch, rootState }, name) {
    axios.post(`http://localhost:8088/gitpush`, {location: rootState.Book.location, name: name})
      .catch(e => {
        dispatch('open_book', rootState.Book.location)
        messageBus.$emit('showError', e.response.data)
      })
  },

  git_pull ({ commit, rootState }, name) {
    axios.post(`http://localhost:8088/gitpull`, {location: rootState.Book.location, name: name})
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_create_branch ({ commit, state, rootState }, name) {
    axios.post(`http://localhost:8088/gitcreatebranch`, {location: rootState.Book.location, name: name})
      .then(res => commit('GIT_ADD_BRANCHES', [...state.branches, name]))
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_switch_branch ({ commit, rootState }, name) {
    axios.post(`http://localhost:8088/gitswitchbranch`, {location: rootState.Book.location, name: name})
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  git_rebase_continue ({ commit, rootState }) {
    axios.post(`http://localhost:8088/gitrebasecontinue`, {location: rootState.Book.location})
      .catch(e => messageBus.$emit('showError', e.response.data))
  }

}

export default {
  state,
  mutations,
  actions
}
