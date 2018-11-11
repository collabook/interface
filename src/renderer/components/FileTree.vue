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
const prompt = require('electron-prompt')

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
      this.$store.dispatch('toggle_visibility', {filename: node.name, action: 'toggle'})
    },

    rightMenuHandle (e) {
      e.preventDefault()
      var par = this
      const menu = new Menu()
      var array = e.target.id.split('/')
      var fileName = array[array.length - 1]
      var node = this.$store.state.Book.BookTree[fileName]
      if (node.isFolder === true) {
        // TODO: remove this code repitition
        menu.append(new MenuItem({label: 'Add new file',
          click () {
            prompt({
              title: 'Enter a name for the file',
              label: 'Name:',
              value: 'NewFile',
              inputAttrs: {
                type: 'input',
                required: true
              },
              type: 'input'
            })
              .then((r) => {
                if (r === null) {
                  console.log('user cancelled')
                } else {
                  console.log('result', r)
                  par.$store.dispatch('add_file', {parent: e.target.id, child: r, isFolder: false})
                }
              })
              .catch(console.error)
          }}))
        menu.append(new MenuItem({type: 'separator'}))
        menu.append(new MenuItem({label: 'Add new Folder',
          click () {
            prompt({
              title: 'Enter a name for the folder',
              label: 'Name:',
              value: 'NewFolder',
              inputAttrs: {
                type: 'input',
                required: true
              },
              type: 'input'
            })
              .then((r) => {
                if (r === null) {
                  console.log('user cancelled')
                } else {
                  console.log('result', r)
                  par.$store.dispatch('add_file', {parent: e.target.id, child: r, isFolder: true})
                }
              })
              .catch(console.error)
          }}))
        menu.append(new MenuItem({type: 'separator'}))
      }
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
