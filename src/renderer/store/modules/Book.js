import axios from 'axios'

const state = {

  BookTree: {
    name: 'Name',
    fullPath: '/',
    isVisible: true,
    isFolder: true,
    content: '',
    isActive: false,
    subFolders: [
      {
        name: 'chapter1',
        fullPath: '/chapter1',
        isVisible: true,
        isFolder: false,
        content: 'Begining of chapter 1',
        isActive: true,
        subFolders: []
      },
      {
        name: 'chapter2',
        fullPath: '/chapter2',
        isVisible: true,
        isFolder: false,
        content: 'Begining of chapter 2',
        isActive: false,
        subFolders: []
      },
      {
        name: 'chapter3',
        fullPath: '/chapter3',
        isVisible: true,
        isFolder: true,
        content: '',
        isActive: false,
        subFolders: [
          {
            name: 'section1',
            fullPath: '/chapter3/section1',
            isVisible: false,
            isFolder: false,
            isActive: false,
            content: 'Chapter 3 section 1 The Begining of the End',
            subFolders: []
          }
        ]
      }
    ]
  },

  files: {
    name: 'book',
    subfolders: [{
      name: 'file2',
      subfolders: []
    },
    {
      name: 'file3',
      subfolders: [{
        name: 'section1',
        subfolders: []
      }]
    },
    {
      name: 'file4'
    }]
  },

  visibility: {'book': true, 'file2': false, 'file3': false, 'section1': false, 'file4': false},

  content: {
    file2: 'hello world',
    section1: 'how are you',
    file4: 'i am fine'
  },

  contentCurrent: '',

  active: ''

}

const mutations = {

  NEW_BOOK (state, context) {
    state.bookname = context.name
    state.files = context.files
  },

  SAVE_FILE (state, filename, content) {
    state.filename.content = content
  },

  TOGGLE_VISIBILITY (state, filename) {
    state.visibility[filename] = !state.visibility[filename]
  },

  CHANGE_CURRENT_FILE (state, filename) {
    state.contentCurrent = state.content[filename]
    state.active = filename
  },

  CONTENT_CHANGED (state, value) {
    state.content[state.active] = value
  }

}

const actions = {

  // Check if node is file or folder
  change_current_file ({ commit }, filename) {
    commit('CHANGE_CURRENT_FILE', filename)
  },

  content_changed ({ commit }, value) {
    commit('CONTENT_CHANGED', value)
  },

  save_file ({ commit, state }) {
    var context = {'file': state.active, 'content': state.content[state.active]}
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

  toggle_visibility ({ commit }, filename) {
    var subs = findSubs(filename, state.files)
    if (subs) {
      for (var i = 0; i < subs.length; i++) {
        commit('TOGGLE_VISIBILITY', subs[i].name)
      }
    }
  }
}

function findSubs (filename, files) {
  if (files.name === filename) {
    return files.subfolders
  } else if (files.subfolders != null) {
    var i
    var result = null
    for (i = 0; result == null && i < files.subfolders.length; i++) {
      result = findSubs(filename, files.subfolders[i])
    }
    return result
  }
  return null
}

export default {
  state,
  mutations,
  actions
}
