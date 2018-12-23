import axios from 'axios'
import Vue from 'vue'
import { messageBus } from './../../main.js'

const state = {

  files: {},

  name: '',

  activeFile: null,

  currentContent: '',

  location: null,

  modifiedFiles: new Set(),

  synopsisChanged: false,

  treeModified: false,

  author: '',

  email: ''
}

const mutations = {

  // open book new book mutations are the same
  //
  NEW_BOOK (state, {files, location, name}) {
    state.files = files
    state.location = location
    state.name = name

    // set some default values
    state.synopsisChanged = false
    state.treeModified = false
    state.modifiedFiles = new Set()
    state.activeFile = null
    state.currentContent = ''
  },

  // Probably not needed
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
    // here modified file flag should be checked instead of direct content
    if (state.activeFile !== null && state.files[state.activeFile].content !== state.currentContent) {
      state.files[state.activeFile].content = state.currentContent
    }
    state.activeFile = id
    state.currentContent = state.files[id].content
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
    state.modifiedFiles.add(state.activeFile)
  },

  ADD_FILE (state, {id, node}) {
    Vue.set(state.files, id, node)
  },

  ADD_SYNOPSIS (state, {id, content}) {
    state.synopsis = [...state.synopsis, {id: id, content: content}]
    state.synopsisChanged = true
  },

  SYNOPSIS_CHANGE (state, payload) {
    state.files[payload.id].synopsis = payload.value
    /*
    var newSynopsis = state.synopsis.map(item => {
      if (item.id === payload.id) {
        return {
          id: payload.id,
          content: payload.value
        }
      } else {
        return item
      }
    })
    Vue.set(state, 'synopsis', [...newSynopsis])
    state.synopsisChanged = true
    */
  },

  RESET_SYNOPSIS_CHANGE (state) {
    state.synopsisChanged = false
  },

  RESET_CONTENT_CHANGED (state) {
    state.modifiedFiles = new Set()
  },

  SET_AUTHOR (state, {name, email}) {
    state.author = name
    state.email = email
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

  // Probably does not belong in store
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

  // should return all contents and book tree
  // backend should iterate tree create files if doesn't exist
  // then save contents
  //
  // it should update ka current files content before saving book
  //
  // perhaps we can use this to save synopsis change as well
  // if we do this we should check for some book content modified flag as we don't want to be sending
  // the entire book to backend for some small synopsis update
  save_book ({ commit, state }) {
    // we do this because state.currentContent stores the content viewable on the editor
    // the changes in state.currentContent are only propogated to state.content when the user switches
    // to another file
    // this is a problem in cases like:
    // user opens a file makes changes but presses ctrl+s without switching the current file to something else
    // here the content of state.content won't be updated only the currentContent is updated
    // changing current to file current file will propogate the changes
    if (state.modifiedFiles.has(state.activeFile) === true) {
      commit('CHANGE_CURRENT_FILE', state.activeFile)
    }

    // TODO: only modified files should be sent to core
    if (state.modifiedFiles.size > 0 || state.treeModified === true || state.synopsisChanged === true) {
      axios.post(`http://127.0.0.1:8088/savebook`,
        {
          location: state.location,
          tree: state.bookTree,
          content: state.content,
          synopsis: state.synopsis
        })
        .then((res) => {
          commit('RESET_CONTENT_CHANGED')
        })
        .catch((e) => {
          messageBus.$emit('showError', e.response.data)
        })
    }
  },

  new_book ({ commit }, context) {
    axios.post(`http://127.0.0.1:8088/newbook`, context)
      .then((res) => {
        commit('NEW_BOOK',
          {
            files: res.data.files,
            location: res.data.location,
            name: res.data.name
          })
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  open_book ({ commit }, location) {
    axios.post(`http://127.0.0.1:8088/openbook`, {location: location})
      .then((res) => {
        commit('NEW_BOOK', {
          files: res.data.files,
          location: res.data.location,
          name: res.data.name
        })
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  toggle_visibility ({ commit, state }, {id, action}) {
    // this should probably be done as an action of opening folder and closing folder
    for (var file in state.files) {
      if (state.files[file].parent === id) {
        commit('TOGGLE_VISIBILITY', {id: file, action: action})
      }
    }
  },

  new_author ({ commit, state }, context) {
    var payload = {name: context.name, email: context.email}
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
        commit('SET_AUTHOR', {name: context.name, email: context.email})
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
