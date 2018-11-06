<template>
  <div id="wrapper">
    <editor id="editor" v-model="content" @init="editorInit" lang="markdown" theme="kuroir" width="1000px" height="835"></editor>
  </div>
</template>

<script>
  export default {
    name: 'EditorPage',

    methods: {
      editorInit: function (editor) {
        require('brace/ext/language_tools')
        require('brace/mode/html')
        require('brace/mode/markdown')
        require('brace/theme/kuroir')
        document.getElementById('editor').style.fontSize = '16px'
        editor.setWrapBehavioursEnabled(true)
        editor.setShowFoldWidgets(true)
        editor.setShowPrintMargin(true)
        editor.renderer.setShowGutter(false)
        editor.getSession().setUseWrapMode(true)
        editor.getSession().setUseSoftTabs(true)
      }

    },

    components: {
      editor: require('vue2-ace-editor')
    },

    computed: {
      content: {
        get () {
          return this.$store.state.Book.currentContent
        },
        set (value) {
          this.$store.dispatch('content_changed', value)
        }
      }
    }
  }
</script>

<style scoped>
#wrapper {
  height: 100%;
}

#editor {
  height: 100%;
}
</style>
