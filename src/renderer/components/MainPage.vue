<template>
  <div id="wrapper">
    <EditorPage></EditorPage>
  </div>
</template>

<script>
import EditorPage from './EditorPage'
import { messageBus } from '../main.js'
import axios from 'axios'

export default {
  name: 'MainWindow',
  components: {
    EditorPage
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
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}
</style>
