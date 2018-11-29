<template>
  <div id="editor-wrapper">
      <vue-editor id="main-editor" v-model="content" :editorToolbar="customToolbar"></vue-editor>
    </div>
  </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
  name: 'EditorPage',

  data () {
    return {
      customToolbar: [
        [{ 'font': [] }],

        [{ 'header': [false, 1, 2, 3, 4, 5, 6] }],

        [{ 'size': ['small', false, 'large', 'huge'] }],

        ['bold', 'italic', 'underline', 'strike'],

        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],

        [{ 'header': 1 }, { 'header': 2 }],

        ['blockquote', 'code-block'],

        [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],

        [{'script': 'sub'}, {'script': 'super'}],

        [{'indent': '-1'}, {'indent': '+1'}],

        [{'color': []}, {'background': []}],

        [{'direction': 'rtl'}]
      ]
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
