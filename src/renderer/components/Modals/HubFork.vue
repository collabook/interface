<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Fork Github Repo</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Repo Name</label>
          <b-field>
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter repo name to fork"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

          <label class="label">Repo Owner</label>
          <b-field>
            <b-input
                   type="text"
                    :value="owner"
                    placeholder="Enter repo name of repo owner"
                    v-model="owner"
                    required>
            </b-input>
          </b-field>


        </section>

        <footer class="modal-card-foot">
          <button class="button is-primary" @click="hub_fork">Fork</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HubFork',
  methods: {
    hub_fork () {
      this.$store.dispatch('hub_fork_repo', {name: this.name, owner: this.owner})
      this.$parent.close()
    }
  },
  data () {
    return {
      name: '',
      owner: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}
</style>
