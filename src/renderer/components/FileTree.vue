<template>
  <div id="wrapper">
    <ul class="tree-list">
      <nodes :handle-click="handleClick" :node="files"></nodes>
    </ul>
  </div>
</template>

<script>
import Nodes from './Nodes'
export default {
  name: 'FileTree',
  components: {
    Nodes
  },
  props: {
    files: Object,
    node: Object
  },
  methods: {
    handleClick (node) {
      this.$store.dispatch('toggle_visibility', node.name)
    }
  }
}
</script>

<style>
#wrapper {
  height: 100%;
}

.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}

</style>
