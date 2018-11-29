<template>
  <div class="columns" id="wrapper">
    <FileTree v-if="heirTree" class="column mycolumn is-2" :files="heirTree"/></FileTree>
    <EditorPage class="column mycolumn is-11"></EditorPage>
  </div>
</template>

<script>
import EditorPage from './EditorPage'
import FileTree from './FileTree'

export default {
  name: 'StartPage',
  components: {
    EditorPage,
    FileTree
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

.mycolumn {
  padding-right: 0em;
  padding-left: 0em;
}
</style>
