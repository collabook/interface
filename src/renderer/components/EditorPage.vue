<template>
  <div id="wrapper">
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
  name: 'EditorPage',

  data () {
    return {
      editorOption: {
        theme: 'core'
      }
    }
  },

  computed: {
    content: {
      get () {
        return this.$store.state.Book.currentContent
      },
      set (value) {
        this.$store.dispatch('content_changed', value)
      }
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },

  components: {
    VueEditor
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
  width: 75%;
}
</style>
