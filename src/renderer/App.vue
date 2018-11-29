<template>
  <div id="app">
    <router-view></router-view>
    <b-modal :active.sync="isComponentModalActive" :width="500" has-modal-card>
      <new-book-modal></new-book-modal>
    </b-modal>
  </div>
</template>

<script>
import NewBookModal from '@/components/NewBookModal'
import { messageBus } from './main.js'
const { dialog } = require('electron').remote

export default {
  name: 'interface',
  components: {
    NewBookModal
  },
  created: function () {
    messageBus.$on('newBook', () => {
      this.isComponentModalActive = true
    })
    // not a thing
    messageBus.$on('saveBook', () => {
      this.$store.dispatch('save_book')
    })
    messageBus.$on('save', () => {
      this.$store.dispatch('save_file')
    })
    messageBus.$on('openBook', () => {
      var loc = dialog.showOpenDialog({properties: ['openDirectory']})[0]
      this.$store.dispatch('open_book', loc)
      this.$router.push('startpage')
    })
    messageBus.$on('corkboardView', () => {
      this.$router.push('corkboard')
    })
  },
  data () {
    return {
      isComponentModalActive: false
    }
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
