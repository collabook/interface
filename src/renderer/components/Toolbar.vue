<template>
  <div id="toolbar">
    <div class="tool-section">

      <b-tooltip label="File tree" position="is-bottom" animated>
          <font-awesome-icon icon="sitemap" size="2x" @click="toggleTree"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="New Book" position="is-bottom" animated>
          <font-awesome-icon icon="book" size="2x" @click="newBook"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Open Book" position="is-bottom" animated>
        <font-awesome-icon icon="book-open" size="2x" @click="openBook"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Save" position="is-bottom" animated>
        <font-awesome-icon icon="save" size="2x" @click="save"></font-awesome-icon>
      </b-tooltip>
    </div>

    <div class="tool-section">
      <b-tooltip label="Editor" position="is-bottom" animated>
        <font-awesome-icon icon="edit" size="2x" @click="editor"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Corkboard" position="is-bottom" animated>
        <font-awesome-icon icon="bookmark" size="2x" @click="synopsis"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Split" position="is-bottom" animated>
        <font-awesome-icon icon="columns" size="2x"></font-awesome-icon>
      </b-tooltip>

    </div>

    <div class="tool-section">
      <b-tooltip label="Commit" position="is-bottom" animated>
        <font-awesome-icon icon="envelope" size="2x" @click="commit"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Logs" position="is-bottom" animated>
        <font-awesome-icon icon="list" size="2x" @click="logs"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Create branch" position="is-bottom" animated>
        <img src="static/add_branch.png" style="width:30px;height:30px" @click="createBranch"/>
      </b-tooltip>
      <b-tooltip label="Switch Branch" position="is-bottom" animated>
        <img src="static/switch_branch.png" style="width:30px;height:30px" @click="switchBranch"/>
      </b-tooltip>
      <b-tooltip label="Add remote" position="is-bottom" animated>
        <img src="static/add_remote.png" style="width:45px;height:30px" @click="addRemote"/>
      </b-tooltip>
      <b-tooltip label="Pull" position="is-bottom" animated>
        <font-awesome-icon icon="cloud-download-alt" size="2x" @click="pull"></font-awesome-icon>
      </b-tooltip>
      <b-tooltip label="Push" position="is-bottom" animated>
        <font-awesome-icon icon="cloud-upload-alt" size="2x" @click="push"></font-awesome-icon>
      </b-tooltip>
    </div>

  </div>
</template>

<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

export default {
  name: 'Toolbar',

  computed: {
    branches () {
      return this.$store.state.Vcs.branches
    },
    remotes () {
      return this.$store.state.Vcs.remotes
    }
  },

  methods: {
    toggleTree () {
      this.$store.dispatch('toggle_file_tree')
    },
    newBook () {
      this.$messageBus.$emit('newBook')
    },
    openBook () {
      this.$messageBus.$emit('openBook')
    },
    save () {
      this.$messageBus.$emit('save')
    },
    editor () {
      this.$router.push('startpage')
    },
    synopsis () {
      this.$router.push('corkboard')
    },
    commit () {
      this.$messageBus.$emit('gitCommit')
    },
    logs () {
      this.$router.push('commitlog')
    },
    createBranch () {
      this.$messageBus.$emit('gitCreateBranch')
    },
    switchBranch (e) {
      var par = this
      const menu = new Menu()
      for (var i = 0; i < this.branches.length; i++) {
        menu.append(new MenuItem({label: par.branches[i],
          click () {
            this.$store.dispatch('switch_branch', par.branches[i])
          }
        }))
      }
      menu.popup({window: remote.getCurrentWindow()})
    },
    addRemote () {
      this.$messageBus.$emit('gitAddRemote')
    },
    pull () {
      var par = this
      const menu = new Menu()
      for (var i = 0; i < this.remotes.length; i++) {
        menu.append(new MenuItem({label: par.remotes[i],
          click () {
            this.$store.dispatch('git_pull', par.remotes[i])
          }
        }))
      }
      menu.popup({window: remote.getCurrentWindow()})
    },
    push () {
      var par = this
      const menu = new Menu()
      for (var i = 0; i < this.remotes.length; i++) {
        menu.append(new MenuItem({label: par.remotes[i],
          click () {
            this.$store.dispatch('git_push', par.remotes[i])
          }
        }))
      }
      menu.popup({window: remote.getCurrentWindow()})
    }
  }
}
</script>

<style>

#toolbar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: #00d1b2;
}

.tool-section {
  border-right: 2px solid grey;
  padding-right: 5px;
  padding-left: 5px;
}

.tool-section > * {
  margin-left: 7px;
}

</style>
