<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view></router-view>
    <all-modals></all-modals>
  </div>
</template>

<script>
import AllModals from '@/components/Modals/AllModals'
import Toolbar from '@/components/Toolbar'

import { messageBus } from './main.js'
const { dialog } = require('electron').remote

export default {
  name: 'interface',

  components: {
    AllModals,
    Toolbar
  },

  /*
  message passing from electron renderer to all vue components
  */
  created: function () {
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
    messageBus.$on('gitLog', () => {
      this.$router.push('commitlog')
    })
    messageBus.$on('gitRebaseContinue', () => {
      this.$store.dispatch('git_rebase_continue')
    })
    messageBus.$on('showError', (msg) => {
      this.$dialog.alert(msg)
    })
    messageBus.$on('export', () => {
      this.$router.push('/compile')
    })
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
