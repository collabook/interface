<template>
  <div id="wrapper" v-if="this.$store.state.Book.visibility[node.name]">
      <li>
        <span @click="handleClick(node)">{{ node.name }}</span>
        <ul v-if="node.subfolders && node.subfolders.length">
          <node v-for="child in node.subfolders" :node="child" :handle-click="handleClick"></node>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'node',
  props: {
    node: Object,
    handleClick: Function
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
