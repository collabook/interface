<template>
  <div class="columns" id="wrapper">
    <FileTree class="column is-1" :files="heirTree"></FileTree>
    <EditorPage class="column is-11"></EditorPage>
  </div>
</template>

<script>
import EditorPage from './EditorPage'
import FileTree from './FileTree'
import { messageBus } from '../main.js'
import axios from 'axios'

export default {
  name: 'MainWindow',
  components: {
    EditorPage,
    FileTree
  },
  created: function () {
    messageBus.$on('newBook', () => {
      this.$store.dispatch('new_book', {genre: 'fanatasy', name: 'ntw'})
    })
    // not a thing
    messageBus.$on('saveBook', (location) => {
      console.log(this.$store.state.Book.file_heirarchy)
      axios.post(`http://127.0.0.1:8088/savebook`, this.$store.state.Book.file_heirarchy)
        .catch((e) => {
          console.log(e)
        })
    })
    messageBus.$on('save', () => {
      this.$store.dispatch('save_file')
    })
  },
  computed: {
    heirTree () {
      return this.$store.getters.heirTree
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}
</style>
