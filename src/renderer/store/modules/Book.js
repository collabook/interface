import axios from 'axios'
import Vue from 'vue'
import { messageBus } from './../../main.js'

const state = {

  // may be we should add a content changed from disk flag
  // this should be an array
  bookTree: {},

  name: '',

  activeFile: null,

  currentContent: '',

  content: {},

  location: null,

  synopsis: [],

  modifiedFiles: new Set(),

  synopsisChanged: false,

  treeModified: false,

  author: '',

  email: ''
}

const mutations = {

  // open book new book mutations are the same
  //
  NEW_BOOK (state, {tree, content, location, synopsis, name}) {
    state.bookTree = tree
    state.content = content
    state.location = location
    state.synopsis = synopsis
    state.name = name
    state.synopsisChanged = false
    state.treeModified = false
    state.modifiedFiles = new Set()
    state.activeFile = null
    state.currentContent = ''
  },

  OPEN_BOOK (state, {tree, content, location, synopsis, name}) {
    state.bookTree = tree
    state.content = content
    state.location = location
    state.synopsis = synopsis
    state.name = name
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
      state.bookTree[id].isVisible = !state.bookTree[id].isVisible
    } else if (action === 'on') {
      state.bookTree[id].isVisible = true
    } else {
      state.bookTree[id].isVisible = false
    }
  },

  CHANGE_CURRENT_FILE (state, id) {
    // here modified file flag should be checked instead of direct content
    if (state.activeFile !== null && state.content[state.activeFile] !== state.currentContent) {
      state.content[state.activeFile] = state.currentContent
    }
    state.activeFile = id
    state.currentContent = state.content[id]
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
    state.modifiedFiles.add(state.activeFile)
  },

  ADD_FILE (state, {id, node}) {
    Vue.set(state.bookTree, id, node)
    if (node.isFolder === false) {
      state.content[id] = ''
    }
    state.treeModified = true
  },

  ADD_SYNOPSIS (state, {id, content}) {
    state.synopsis = [...state.synopsis, {id: id, content: content}]
    state.synopsisChanged = true
  },

  SYNOPSIS_CHANGE (state, payload) {
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
    if (!state.bookTree[id].isFolder) {
      commit('CHANGE_CURRENT_FILE', id)
    }
  },

  content_changed ({ commit }, value) {
    commit('CONTENT_CHANGED', value)
  },

  add_file ({ commit, dispatch, state }, {parent, child, isFolder}) {
    dispatch('toggle_visibility', {id: parent, action: 'on'})
    var parentPath = state.bookTree[parent].fullPath
    var id = Object.keys(state.bookTree).length + 1
    var node = {
      id: id,
      name: child,
      parent: parseInt(parent),
      fullPath: `${parentPath}/${child}`,
      isVisible: true,
      isFolder: isFolder,
      isResearch: state.bookTree[parent].isResearch
    }
    commit('ADD_FILE', {id: id, node: node})
    commit('ADD_SYNOPSIS', {id: id, content: ''})
  },

  // Probably does not belong in store
  save_file ({ commit, state }) {
    var context = {'file': state.activeFile, 'content': state.currentContent}
    axios.post(`http://127.0.0.1:8088/save`, context)
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
    var location = `${context.location}/${context.name}`
    axios.post(`http://127.0.0.1:8088/newbook`, context)
      .then((res) => {
        commit('NEW_BOOK',
          {
            tree: res.data.tree,
            content: res.data.content,
            location: location,
            synopsis: res.data.synopsis,
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
        commit('OPEN_BOOK', {tree: res.data.tree, content: res.data.content, location: location, synopsis: res.data.synopsis, name: res.data.name})
      })
      .catch((e) => {
        messageBus.$emit('showError', e.response.data)
      })
  },

  toggle_visibility ({ commit, state }, {id, action}) {
    // this should probably be done as an action of opening folder and closing folder
    for (var file in state.bookTree) {
      if (state.bookTree[file].parent === id) {
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
    if (!state.bookTree) {
      return null
    }
    var flatArray = JSON.parse(JSON.stringify(state.bookTree))
    var root = []
    var file

    for (file in flatArray) {
      flatArray[file].subfolders = []
    }

    for (file in flatArray) {
      var currentFile = flatArray[file]
      if (currentFile.parent === 0) {
        root.push(currentFile)
      } else {
        flatArray[currentFile.parent].subfolders.push(currentFile)
      }
    }
    return root
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
