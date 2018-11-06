import axios from 'axios'

const state = {

  BookTree: {

    // may be we should add a content changed from disk flag
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

  NEW_BOOK (state, context) {
    state.bookname = context.name
    state.files = context.files
  },

  // Probably not needed
  SAVE_FILE (state, filename, content) {
    state.filename.content = content
  },

  TOGGLE_VISIBILITY (state, name) {
    state.BookTree[name].isVisible = !state.BookTree[name].isVisible
  },

  CHANGE_CURRENT_FILE (state, filename) {
    if (state.activeFile !== '') {
      state.BookTree[state.activeFile].content = state.currentContent
    }
    state.activeFile = filename
    state.currentContent = state.BookTree[filename].content
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
  }

}

const actions = {

  change_current_file ({ commit, state }, filename) {
    if (!state.BookTree[filename].isFolder) {
      commit('CHANGE_CURRENT_FILE', filename)
    }
  },

  content_changed ({ commit }, value) {
    commit('CONTENT_CHANGED', value)
  },

  // Probably does not belong in store
  save_file ({ commit, state }) {
    var context = {'file': state.activeFile, 'content': state.currentContent}
    axios.post(`http://127.0.0.1:8088/save`, context)
  },

  new_book ({ commit }, context) {
    axios.post(`http://127.0.0.1:8088/newbook/${context.genre}/${context.name}`)
      .then((res) => {
        commit('NEW_BOOK', {name: context.name, files: res.data.files})
      })
      .catch((e) => {
        console.log(e)
      })
  },

  toggle_visibility ({ commit, state }, filename) {
    for (var file in state.BookTree) {
      var path = state.BookTree[file].fullPath.split('/')
      if (path[path.length - 2] === filename) {
        commit('TOGGLE_VISIBILITY', state.BookTree[file].name)
      }
    }
  }
}

export default {
  state,
  mutations,
  actions
}
