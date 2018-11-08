<template>
  <div id="wrapper">
    <ul class="tree-list">
      <nodes :right-menu="rightMenuHandle" :handle-click="handleClick" :node="files"></nodes>
    </ul>
  </div>
</template>

<script>
import Nodes from './Nodes'
const {remote} = require('electron')
const {Menu, MenuItem} = remote

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
      // TODO: convert this into a single action
      this.$store.dispatch('change_current_file', node.name)
      this.$store.dispatch('toggle_visibility', node.name)
    },

    rightMenuHandle (e) {
      e.preventDefault()
      const menu = new Menu()
      var par = this
      menu.append(new MenuItem({label: 'Add new file', click () { par.$store.dispatch('add_file', {parent: e.target.id, child: 'name1'}) }}))
      menu.append(new MenuItem({type: 'separator'}))
      menu.append(new MenuItem({label: 'Delete file', click () { console.log(this) }}))
      menu.popup({window: remote.getCurrentWindow()})
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
