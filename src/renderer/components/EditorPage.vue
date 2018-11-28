<template>
  <div id="editor-wrapper">
      <vue-editor id="main-editor" v-model="content"></vue-editor>
    </div>
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

<style>
#main-editor .ql-editor {
  height: 785px;
  padding: 0px;
}

</style>
