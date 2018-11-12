import axios from 'axios'
import Vue from 'vue'

const state = {

  // may be we should add a content changed from disk flag
  // this should be an array
  bookTree: {

    'Book': {
      name: 'Book',
      fullPath: '/Book',
      isVisible: true,
      isFolder: true,
      content: ''
    },

    'chapter1': {
      name: 'chapter1',
      fullPath: '/Book/chapter1',
      isVisible: true,
      isFolder: false,
      content: 'Begining of chapter 1'
    },

    'chapter2': {
      name: 'chapter2',
      fullPath: '/Book/chapter2',
      isVisible: true,
      isFolder: false,
      content: 'Begining of chapter 2'
    },

    'chapter3': {
      name: 'chapter3',
      fullPath: '/Book/chapter3',
      isVisible: true,
      isFolder: true,
      content: ''
    },

    'section1': {
      name: 'section1',
      fullPath: '/Book/chapter3/section1',
      isVisible: false,
      isFolder: false,
      content: 'Chapter 3 section 1 The Begining of the End'
    }
  },

  activeFile: '',

  currentContent: ''
}

const mutations = {

  NEW_BOOK (state, tree) {
    state.bookTree = tree.bookTree
  },

  // Probably not needed
  SAVE_FILE (state, filename, content) {
    state.filename.content = content
  },

  TOGGLE_VISIBILITY (state, {name, action}) {
    if (action === 'toggle') {
      state.bookTree[name].isVisible = !state.bookTree[name].isVisible
    } else if (action === 'on') {
      state.bookTree[name].isVisible = true
    } else {
      state.bookTree[name].isVisible = false
    }
  },

  CHANGE_CURRENT_FILE (state, filename) {
    if (state.activeFile !== '') {
      state.bookTree[state.activeFile].content = state.currentContent
    }
    state.activeFile = filename
    state.currentContent = state.bookTree[filename].content
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
  },

  ADD_FILE (state, {name, node}) {
    Vue.set(state.bookTree, name, node)
  }

}

const actions = {

  change_current_file ({ commit, state }, filename) {
    if (!state.bookTree[filename].isFolder) {
      commit('CHANGE_CURRENT_FILE', filename)
    }
  },

  content_changed ({ commit }, value) {
    commit('CONTENT_CHANGED', value)
  },

  add_file ({ commit, dispatch }, {parent, child, isFolder}) {
    var parentPath = parent.split('/')
    var parentName = parentPath[parentPath.length - 1]
    dispatch('toggle_visibility', {filename: parentName, action: 'on'})
    var node = {
      name: child,
      fullPath: `${parent}/${child}`,
      isVisible: true,
      isFolder: isFolder,
      content: ''
    }
    commit('ADD_FILE', {name: child, node: node})
  },

  // Probably does not belong in store
  // turn off ismodified
  save_file ({ commit, state }) {
    var context = {'file': state.activeFile, 'content': state.currentContent}
    axios.post(`http://127.0.0.1:8088/save`, context)
  },

  new_book ({ commit }, context) {
    axios.post(`http://127.0.0.1:8088/newbook`, context)
      .then((res) => {
        console.log(res.data)
        commit('NEW_BOOK', res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  },

  toggle_visibility ({ commit, state }, {filename, action}) {
    for (var file in state.bookTree) {
      var path = state.bookTree[file].fullPath.split('/')
      if (path[path.length - 2] === filename) {
        commit('TOGGLE_VISIBILITY', {name: state.bookTree[file].name, action: action})
      }
    }
  }
}

const getters = {
  heirTree (state) {
    var flatArray = JSON.parse(JSON.stringify(state.bookTree))
    var root
    var file

    for (file in flatArray) {
      flatArray[file].subfolders = []
    }

    for (file in flatArray) {
      var route = flatArray[file].fullPath.split('/')
      if (route.length !== 2) {
        var parent = route[route.length - 2]
        flatArray[parent].subfolders.push(flatArray[file])
      }
      if (route.length === 2) {
        root = flatArray[file]
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
