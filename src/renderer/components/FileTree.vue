<template>
  <div id="wrapper">
    <ul class="tree-list">
      <nodes :files="files"></nodes>
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
    files: Object
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
