const state = {
  fileTreeVisible: true
}

const mutations = {
  TOGGLE_FILE_TREE (state) {
    state.fileTreeVisible = !state.fileTreeVisible
  }
}

const actions = {
  toggle_file_tree ({ commit }) {
    commit('TOGGLE_FILE_TREE')
  }
}

export default {
  state,
  mutations,
  actions
}
