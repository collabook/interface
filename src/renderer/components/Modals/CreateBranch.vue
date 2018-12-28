<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new Branch</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Branch Name</label>
          <b-field>
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter a name for the branch"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="create">Create Branch</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CreateBranch',
  methods: {
    create () {
      this.$store.dispatch('git_create_branch', this.name)
        .catch(e => this.$dialog.alert(e.response.data))
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
