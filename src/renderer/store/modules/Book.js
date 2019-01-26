import axios from 'axios'
import Vue from 'vue'
import { messageBus } from './../../main.js'

const state = {

  files: {},

  name: '',

  activeFile: null,

  currentContent: null,

  location: null,

  author: '',

  email: '',

  token: ''
}

const mutations = {

  NEW_BOOK (state, {files, location, name}) {
    state.files = files
    state.location = location
    state.name = name
    state.currentContent = null
    state.activeFile = null
  },

  SAVE_FILE (state, filename, content) {
    state.filename.content = content
  },

  TOGGLE_VISIBILITY (state, {id, action}) {
    if (action === 'toggle') {
      state.files[id].isVisible = !state.files[id].isVisible
    } else if (action === 'on') {
      state.files[id].isVisible = true
    } else {
      state.files[id].isVisible = false
    }
  },

  CHANGE_CURRENT_FILE (state, id) {
    if (state.activeFile !== null && state.files[state.activeFile].content !== state.currentContent) {
      state.files[state.activeFile].content = state.currentContent
    }
    state.activeFile = id
    state.currentContent = state.files[id].content
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
  },

  ADD_FILE (state, {id, node}) {
    Vue.set(state.files, id, node)
  },

  DELETE_FILE (state, id) {
    Vue.delete(state.files, id)
  },

  SYNOPSIS_CHANGE (state, payload) {
    state.files[payload.id].synopsis = payload.value
  },

  SET_AUTHOR (state, {name, email, token}) {
    state.author = name
    state.email = email
    state.token = token
  }
}

const actions = {

  change_current_file ({ commit, state }, id) {
    if (!state.files[id].isFolder) {
      commit('CHANGE_CURRENT_FILE', id)
    }
  },

  content_changed ({ commit }, value) {
    commit('CONTENT_CHANGED', value)
  },

  add_file ({ commit, dispatch, state }, {parent, child, isFolder}) {
    dispatch('toggle_visibility', {id: parent, action: 'on'})

    axios.post(`http://localhost:8088/newfile`, {
      parent_id: parent,
      name: child,
      is_folder: isFolder,
      location: state.location,
      parent_rel_path: state.files[parent].relPath
    })
      .then(res => {
        commit('ADD_FILE', {id: res.data.id, node: res.data})
      })
      .catch(e => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  save_file ({ commit, state }) {
    axios.post(`http://127.0.0.1:8088/savefile`, {
      rel_path: state.files[state.activeFile].relPath,
      location: state.location,
      content: state.currentContent
    })
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  save_synopsis ({ commit, state }, id) {
    axios.post(`http://localhost:8088/savesynopsis`, {
      location: state.location,
      synopsis: state.files[id].synopsis,
      id: id
    })
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  new_book ({ commit, dispatch }, context) {
    axios.post(`http://127.0.0.1:8088/newbook`, context)
      .then((res) => {
        commit('NEW_BOOK',
          {
            files: res.data.files,
            location: res.data.location,
            name: res.data.name
          })
        // not sure what the best way to do this ... should log be send along with open book?
        // commit('GIT_ADD_REMOTES', res.data.remotes)
        // commit('GIT_ADD_BRANCHES', res.data.branches)
        // dispatch('git_logs')
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  open_book ({ commit, dispatch }, location) {
    axios.post(`http://127.0.0.1:8088/openbook`, {location: location})
      .then((res) => {
        commit('NEW_BOOK', {
          files: res.data.files,
          location: res.data.location,
          name: res.data.name
        })
        commit('GIT_ADD_REMOTES', res.data.remotes)
        commit('GIT_ADD_BRANCHES', res.data.branches)
        dispatch('git_logs')
      })
      .catch((e) => {
        console.log(e)
        messageBus.$emit('showError', e.response.data)
      })
  },

  toggle_visibility ({ commit, state }, {id, action}) {
    for (var file in state.files) {
      if (state.files[file].parent === id) {
        commit('TOGGLE_VISIBILITY', {id: file, action: action})
      }
    }
  },

  new_author ({ commit, state }, context) {
    var payload = {name: context.name, email: context.email, token: context.token}
    if (context.auth_type === 'Plain') {
      payload.auth = {
        type: context.auth_type,
        args: {
          user: context.username,
          pass: context.password
        }
      }
    } else if (context.auth_type === 'SSHAgent') {
      payload.auth = {
        type: context.auth_type
      }
    } else {
      payload.auth = {
        type: context.auth_type,
        args: {
          path: context.path
        }
      }
    }
    axios.post(`http://localhost:8088/author`, payload)
      .then((res) => {
        commit('SET_AUTHOR', {name: context.name, email: context.email, token: context.token})
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  delete_file ({ commit, state }, id) {
    axios.post(`http://localhost:8088/deletefile`, {
      location: state.location,
      rel_path: state.files[id].relPath,
      id: id
    })
      .then(res => commit('DELETE_FILE', id))
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  compile_book ({ state }, orderedFiles) {
    const ids = orderedFiles.map(file => file.id)
    axios.post(`http://localhost:8088/compile`, {
      location: state.location,
      ids
    })
      .catch(e => console.log(e.response.data))
  }

}

const getters = {
  heirTree (state) {
    if (!state.files) {
      return null
    }
    var flatArray = JSON.parse(JSON.stringify(state.files))
    var root = []
    var file

    for (file in flatArray) {
      flatArray[file].subfolders = []
    }

    for (file in flatArray) {
      var currentFile = flatArray[file]
      if (currentFile.parent === '0') {
        root.push(currentFile)
      } else {
        flatArray[currentFile.parent].subfolders.push(currentFile)
      }
    }
    return root
  },

  synopsis (state) {
    var synopsis = []
    var ids = Object.keys(state.files)
    ids.map(id => synopsis.push({id: id, content: state.files[id].synopsis}))
    return synopsis
  },

  files (state) {
    var files = []
    var ids = Object.keys(state.files)
    ids.filter(id => state.files[id].isFolder === false).map(id => files.push({id: id, rel_path: state.files[id].relPath}))
    return files
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
