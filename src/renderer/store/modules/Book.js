import axios from 'axios'
import Vue from 'vue'

const state = {

  // may be we should add a content changed from disk flag
  // this should be an array
  bookTree: {},

  activeFile: null,

  currentContent: '',

  content: {},

  location: null
}

const mutations = {

  NEW_BOOK (state, {tree, content, location}) {
    state.bookTree = tree
    state.content = content
    state.location = location
  },

  OPEN_BOOK (state, {tree, content, location}) {
    state.bookTree = tree
    state.content = content
    state.location = location
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
    if (state.activeFile !== null) {
      state.content[state.activeFile] = state.currentContent
    }
    state.activeFile = id
    state.currentContent = state.content[id]
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
  },

  ADD_FILE (state, {id, node}) {
    Vue.set(state.bookTree, id, node)
    if (node.isFolder === false) {
      state.content[id] = ''
    }
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

  // i got an error while adding new file check it out
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
      isFolder: isFolder
    }
    commit('ADD_FILE', {id: id, node: node})
  },

  // Probably does not belong in store
  // turn off ismodified
  save_file ({ commit, state }) {
    var context = {'file': state.activeFile, 'content': state.currentContent}
    axios.post(`http://127.0.0.1:8088/save`, context)
  },

  // should return all contents and book tree
  // backend should iterate tree create files if doesn't exist
  // then save contents
  save_book ({ commit, state }) {
    axios.post(`http://127.0.0.1:8088/savebook`, {location: state.location, tree: state.bookTree, content: state.content})
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  },

  new_book ({ commit }, context) {
    axios.post(`http://127.0.0.1:8088/newbook`, context)
      .then((res) => {
        console.log(res.data)
        commit('NEW_BOOK', {tree: res.data.tree, content: res.data.content, location: context.location})
      })
      .catch((e) => {
        console.log(e)
      })
  },

  open_book ({ commit }, location) {
    axios.post(`http://127.0.0.1:8088/openbook`, {location: location})
      .then((res) => {
        console.log(res.data)
        commit('OPEN_BOOK', {tree: res.data.tree, content: res.data.content, location: location})
      })
      .catch((e) => {
        console.log(e)
      })
  },

  toggle_visibility ({ commit, state }, {id, action}) {
    // this should probably be done as an action of opening folder and closing folder
    for (var file in state.bookTree) {
      if (state.bookTree[file].parent === id) {
        commit('TOGGLE_VISIBILITY', {id: file, action: action})
      }
    }
  }
}

const getters = {
  // needs proper checking whether bookTree is null
  heirTree (state) {
    if (!state.bookTree) {
      return null
    }
    var flatArray = JSON.parse(JSON.stringify(state.bookTree))
    var root
    var file

    for (file in flatArray) {
      flatArray[file].subfolders = []
    }

    for (file in flatArray) {
      var currentFile = flatArray[file]
      if (currentFile.parent === 0) {
        root = currentFile
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
