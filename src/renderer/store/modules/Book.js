import axios from 'axios'
import Vue from 'vue'

const state = {

  // may be we should add a content changed from disk flag
  // this should be an array
  bookTree: {},

  activeFile: null,

  currentContent: '',

  content: {},

  location: null,

  synopsis: [],

  modifiedFiles: new Set(),

  synopsisChanged: false
}

const mutations = {

  NEW_BOOK (state, {tree, content, location, synopsis}) {
    state.bookTree = tree
    state.content = content
    state.location = location
    state.synopsis = synopsis
  },

  OPEN_BOOK (state, {tree, content, location, synopsis}) {
    state.bookTree = tree
    state.content = content
    state.location = location
    state.synopsis = synopsis
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
    // here modified file flag should be checked instead of direct content
    if (state.activeFile !== null && state.content[state.activeFile] !== state.currentContent) {
      state.content[state.activeFile] = state.currentContent
      state.modifiedFiles.add(state.activeFile)
    }
    state.activeFile = id
    state.currentContent = state.content[id]
  },

  CONTENT_CHANGED (state, value) {
    state.currentContent = value
    state.modifiedFiles.add([state.activeFile])
  },

  ADD_FILE (state, {id, node}) {
    Vue.set(state.bookTree, id, node)
    if (node.isFolder === false) {
      state.content[id] = ''
    }
  },

  SYNOPSIS_CHANGE (state, payload) {
    var newSynopsis = state.synopsis.map(item => {
      if (item.id === payload.id) {
        return {
          id: payload.id,
          content: payload.value
        }
      } else {
        return item
      }
    })
    Vue.set(state, 'synopsis', [...newSynopsis])
    state.synopsisChanged = true
  },

  RESET_SYNOPSIS_CHANGE (state) {
    state.synopsisChanged = false
  },

  RESET_CONTENT_CHANGED (state) {
    state.modifiedFiles = new Set()
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
  // TODO: new file should also create a new synopsis
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
  save_file ({ commit, state }) {
    var context = {'file': state.activeFile, 'content': state.currentContent}
    axios.post(`http://127.0.0.1:8088/save`, context)
  },

  // should return all contents and book tree
  // backend should iterate tree create files if doesn't exist
  // then save contents
  //
  // it should update ka current files content before saving book
  //
  // perhaps we can use this to save synopsis change as well
  // if we do this we should check for some book content modified flag as we don't want to be sending
  // the entire book to backend for some small synopsis update
  save_book ({ commit, state }) {
    // we do this because state.currentContent stores the content viewable on the editor
    // the changes in state.currentContent are only propogated to state.content when the user switches
    // to another file
    // this is a problem in cases like:
    // user opens a file makes changes but presses ctrl+s without switching the current file to something else
    // here the content of state.content won't be updated only the currentContent is updated
    // changing current to file current file will propogate the changes
    if (state.modifiedFiles.has([state.activeFile]) === true) {
      commit('CHANGE_CURRENT_FILE', state.activeFile)
    }

    // TODO: only modified files should be sent to core
    if (state.modifiedFiles.size > 0) {
      axios.post(`http://127.0.0.1:8088/savebook`, {location: state.location, tree: state.bookTree, content: state.content})
        .then((res) => {
          commit('RESET_CONTENT_CHANGED')
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    if (state.synopsisChanged === true) {
      console.log(state.synopsis)
      axios.post(`http://127.0.0.1:8088/savesynopsis`, {synopsis: state.synopsis, location: state.location})
        .then((res) => {
          commit('RESET_SYNOPSIS_CHANGE')
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },

  new_book ({ commit }, context) {
    var location = `${context.location}/${context.name}`
    axios.post(`http://127.0.0.1:8088/newbook`, context)
      .then((res) => {
        console.log(res.data)
        commit('NEW_BOOK', {tree: res.data.tree, content: res.data.content, location: location, synopsis: res.data.synopsis})
      })
      .catch((e) => {
        console.log(e)
      })
  },

  open_book ({ commit }, location) {
    axios.post(`http://127.0.0.1:8088/openbook`, {location: location})
      .then((res) => {
        commit('OPEN_BOOK', {tree: res.data.tree, content: res.data.content, location: location, synopsis: res.data.synopsis})
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
  // TODO: needs proper checking whether bookTree is null
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
