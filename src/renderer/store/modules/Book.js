import axios from 'axios'

const state = {
  bookname: '',
  files: []
}


const mutations = {
  NEW_BOOK (state, context) {
    state.bookname = context.name
    state.files = context.files
  },
  SAVE_FILE (state, filename, content) {
    state.filename.content = content
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
