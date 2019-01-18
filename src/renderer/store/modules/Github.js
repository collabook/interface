import axios from 'axios'
const state = {
}

const actions = {
  hub_create_repo ({ state }, context) {
    axios.post(`http://localhost:8088/hubcreate`, context)
  },

  hub_delete_repo ({ state }, context) {
    axios.post(`http://localhost:8088/hubdelete`, context)
  },

  hub_fork_repo ({ state }, context) {
    axios.post(`http://localhost:8088/hubfork`, context)
  }
}

const mutations = {
}

export default {
  state,
  actions,
  mutations
}
