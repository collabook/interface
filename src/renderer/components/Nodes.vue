<template>
  <div id="wrapper" v-if="node.isVisible">
      <li>
        <span :id=node.id @contextmenu="rightMenu($event)" @click="handleClick(node)">{{ node.name }}</span>
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
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
