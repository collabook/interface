import axios from 'axios'

const state = {
  bookname: '',
  files: {name: 'book', subfolders: [{name: 'file2', subfolders: []}, {name: 'file3', subfolders: [{name: 'section1', subfolders: []}]}, {name: 'file4'}]},
  visibility: {'book': true, 'file2': false, 'file3': true, 'section1': true, 'file4': false}
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
    function findSubs (filename, files) {
      if (files.name === filename) {
        return files.subfolders
      }
      for (var file in files.subfolders) {
        findSubs(filename, file)
      }
    }
    var subs = findSubs(filename, state.files)
    if (subs) {
      for (var i = 0; i < subs.length; i++) {
        state.visibility[subs[i].name] = !state.visibility[subs[i].name]
      }
    }
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
  }
}

export default {
  state,
  mutations,
  actions
}
