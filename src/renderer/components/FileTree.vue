<template>
  <div id="filetree-wrapper">
    <div id="file-tree">
      <ul class="tree-list">
        <nodes v-for="file in files" :right-menu="rightMenuHandle" :handle-click="handleClick" :node="file" :key="file.id"></nodes>
      </ul>
    </div>
    <b-modal :active.sync="isNewNodeModalActive" :width="500" has-modal-card>
      <new-node-modal v-bind:parent="parent" v-bind:isFolder="isFolder"></new-node-modal>
    </b-modal>
  </div>
</template>

<script>
import Nodes from './Nodes'
import NewNodeModal from './NewNodeModal'
const {remote} = require('electron')
const {Menu, MenuItem} = remote

export default {
  name: 'FileTree',

  components: {
    Nodes,
    NewNodeModal
  },

  props: {
    files: Array,
    node: Object
  },

  data () {
    return {
      isNewNodeModalActive: false,
      isFolder: false,
      parent: null
    }
  },

  methods: {
    handleClick (node) {
      this.$store.dispatch('change_current_file', node.id)
      this.$store.dispatch('toggle_visibility', {id: node.id, action: 'toggle'})
    },

    rightMenuHandle (e) {
      e.preventDefault()
      var par = this
      const menu = new Menu()
      var node = this.$store.state.Book.bookTree[e.target.id]
      if (node.isFolder === true) {
        menu.append(new MenuItem({label: 'Add new file',
          click () {
            par.isNewNodeModalActive = true
            par.parent = e.target.id
            par.isFolder = false
          }}))
        menu.append(new MenuItem({type: 'separator'}))
        menu.append(new MenuItem({label: 'Add new Folder',
          click () {
            par.isNewNodeModalActive = true
            console.log('sad')
            par.parent = e.target.id
            par.isFolder = true
          }}))
        menu.append(new MenuItem({type: 'separator'}))
      }
      menu.append(new MenuItem({label: 'Delete file', click () { console.log(this) }})) // TODO
      menu.popup({window: remote.getCurrentWindow()})
    }
  }

}
</script>

<style>
#file-tree {
  height: 835px;
  background-color:#f5f5f5;
  padding: 10px;
}

#filetree-wrapper {
  margin: 0px;
}

.tree-list {
  margin-left: 5px;
}

.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}

</style>
