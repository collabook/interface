<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Repo on Github</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Repo Name</label>
          <b-field>
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter a unique repo name"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

          <label class="label">Description</label>
          <b-field>
            <b-input
                   type="text"
                    :value="description"
                    placeholder="Enter repo description"
                    v-model="description"
                    required>
            </b-input>
          </b-field>

        </section>

        <footer class="modal-card-foot">
          <button class="button is-primary" @click="create">Create Repo</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HubCreate',
  methods: {
    create () {
      this.$store.dispatch('hub_create_repo', {name: this.name, description: this.description})
      this.$parent.close()
    }
  },
  data () {
    return {
      name: '',
      description: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
