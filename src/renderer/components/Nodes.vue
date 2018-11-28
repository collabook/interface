<template>
  <div id="wrapper" v-if="node.isVisible">
      <li>
        <span v-bind:class="isActive" :id=node.id @contextmenu="rightMenu($event)" @click="handleClick(node)">
          <font-awesome-icon icon="folder" v-if="node.isFolder"/>
          <font-awesome-icon icon="file" v-if="!node.isFolder" />
          {{ node.name }}
        </span>
        <ul v-if="node.subfolders && node.subfolders.length">
          <node v-for="child in node.subfolders" :key="child.id" :node="child" :right-menu="rightMenu" :handle-click="handleClick"></node>
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
    handleClick: Function,
    rightMenu: Function
  },
  computed: {
    isActive: function () {
      return {
        active: this.$store.state.Book.activeFile === this.node.id
      }
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

.active {
  color: #00d1b2;
}

</style>
