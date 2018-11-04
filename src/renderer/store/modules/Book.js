import axios from 'axios'

const state = {
  bookname: '',
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
  visibility: {'book': true, 'file2': false, 'file3': false, 'section1': false, 'file4': false}
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
  }

}

const actions = {

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
