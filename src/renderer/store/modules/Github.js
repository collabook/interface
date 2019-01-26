import axios from 'axios'
import { messageBus } from './../../main.js'

const state = {
}

const actions = {
  hub_create_repo ({ state }, context) {
    axios.post(`http://localhost:8088/hubcreate`, context)
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  hub_delete_repo ({ state }, context) {
    axios.post(`http://localhost:8088/hubdelete`, context)
      .catch(e => messageBus.$emit('showError', e.response.data))
  },

  hub_fork_repo ({ state }, context) {
    axios.post(`http://localhost:8088/hubfork`, context)
      .catch(e => messageBus.$emit('showError', e.response.data))
  }
}

const mutations = {
}

export default {
  state,
  actions,
  mutations
}
