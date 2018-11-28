<template>
  <div class="columns" id="wrapper">
    <FileTree v-if="heirTree" class="column is-2" :files="heirTree"/></FileTree>
    <EditorPage class="column is-11"></EditorPage>
    <b-modal :active.sync="isComponentModalActive" :width="500" has-modal-card>
      <new-book-modal></new-book-modal>
    </b-modal>
  </div>
</template>

<script>
import EditorPage from './EditorPage'
import FileTree from './FileTree'
import NewBookModal from './NewBookModal'
import { messageBus } from '../main.js'

const { dialog } = require('electron').remote

export default {
  name: 'MainWindow',
  components: {
    EditorPage,
    FileTree,
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
    })
  },
  computed: {
    heirTree () {
      return this.$store.getters.heirTree
    }
  },
  data () {
    return {
      isComponentModalActive: false
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

.column {
  padding-right: 0em;
  padding-left: 0em;
}
</style>
