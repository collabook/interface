<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Node</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Message</label>
          <b-field>
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter a new name"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="createNode">Create Node</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NewNodeModal',

  props: {
    parent: String,
    isFolder: Boolean
  },

  methods: {
    createNode () {
      this.$store.dispatch('add_file', {
        parent: this.parent,
        child: this.name,
        isFolder: this.isFolder
      })
      this.$parent.close()
    }
  },
  data () {
    return {
      name: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
