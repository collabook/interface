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
    heirTree: function () {
      var flatArray = this.$store.state.Book.BookTree
      var root

      for (var file in flatArray) {
        if (!flatArray[file].hasOwnProperty('subfolders')) {
          flatArray[file].subfolders = []
        }

        var route = flatArray[file].fullPath.split('/')
        if (route.length !== 2) {
          var parent = route[route.length - 2]
          flatArray[parent].subfolders.push(flatArray[file])
        }
        if (route.length === 2) {
          root = flatArray[file]
        }
      }
      return root
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}
</style>
