<template>
  <div id="app">
    <router-view></router-view>
    <b-modal :active.sync="isNewBookModalActive" :width="500" has-modal-card>
      <new-book-modal></new-book-modal>
    </b-modal>
    <b-modal :active.sync="isNewAuthorModalActive" :width="500" has-modal-card>
      <new-author-modal></new-author-modal>
    </b-modal>
    <b-modal :active.sync="isNewCommitModalActive" :width="500" has-modal-card>
      <new-commit-modal></new-commit-modal>
    </b-modal>
    <b-modal :active.sync="isNewRemoteModalActive" :width="500" has-modal-card>
      <new-remote-modal></new-remote-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import NewBookModal from '@/components/NewBookModal'
import NewAuthorModal from '@/components/NewAuthorModal'
import NewCommitModal from '@/components/NewCommitModal'
import NewRemoteModal from '@/components/NewRemoteModal'

import { messageBus } from './main.js'
const { dialog } = require('electron').remote

export default {
  name: 'interface',
  components: {
    NewBookModal,
    NewAuthorModal,
    NewCommitModal,
    NewRemoteModal
  },

  data () {
    return {
      isNewBookModalActive: false,
      isNewAuthorModalActive: false,
      isNewCommitModalActive: false,
      isNewRemoteModalActive: false
    }
  },

  mounted () {
    axios.get(`http://localhost:8088/author`)
      .then((res) => {
        this.$store.commit('SET_AUTHOR', {name: res.data.name, email: res.data.email})
        console.log('author found')
      })
      .catch((e) => {
        if (e.response.status === 404) {
          this.isNewAuthorModalActive = true
          console.log('first time user')
        }
      })
  },

  /*
  message passing from electron renderer to all vue components
  */
  created: function () {
    messageBus.$on('newBook', () => {
      this.isNewBookModalActive = true
    })
    messageBus.$on('saveBook', () => {
      this.$store.dispatch('save_book')
    })
    messageBus.$on('save', () => {
      if (this.$router.currentRoute.name === 'startpage') {
        this.$store.dispatch('save_file')
      } else {
        messageBus.$emit('saveSynopsis')
      }
    })
    messageBus.$on('openBook', () => {
      var loc = dialog.showOpenDialog({properties: ['openDirectory']})[0]
      this.$store.dispatch('open_book', loc)
      this.$router.push('startpage')
    })
    messageBus.$on('corkboardView', () => {
      this.$router.push('corkboard')
    })
    messageBus.$on('editorView', () => {
      this.$router.push('startpage')
    })
    messageBus.$on('gitInit', () => {
      this.$store.dispatch('git_init')
    })
    messageBus.$on('gitTrack', () => {
      this.$store.dispatch('git_add')
    })
    messageBus.$on('gitCommit', () => {
      this.isNewCommitModalActive = true
    })
    messageBus.$on('gitLog', () => {
      this.$router.push('commitlog')
    })
    messageBus.$on('userSettings', () => {
      this.isNewAuthorModalActive = true
    })
    messageBus.$on('gitAddRemote', () => {
      this.isNewRemoteModalActive = true
    })
    messageBus.$on('showError', (msg) => {
      this.$dialog.alert(msg)
    })
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
