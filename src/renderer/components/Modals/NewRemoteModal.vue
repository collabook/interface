<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add new Remote</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Remote Name</label>
          <b-field>
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter a new remote name"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

          <label class="label">Remote URL</label>
          <b-field>
            <b-input
                   type="text"
                    :value="url"
                    placeholder="Enter remote url"
                    v-model="url"
                    required>
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="commit">Add</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NewRemoteModal',
  methods: {
    commit () {
      this.$store.dispatch('git_remote_add', {name: this.name, url: this.url})
      this.$parent.close()
    }
  },
  data () {
    return {
      name: '',
      url: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
