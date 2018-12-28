<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Pull from remote</p>
        </header>


        <section class="modal-card-body" required>
          <b-field label="Select remote to push to">
            <b-select placeholder="Select remote" v-model="selection" expanded>
              <option 
                   v-for="remote in remotes"
                   :value="remote"
                   :key="remote">
              {{ remote }}
              </option>
            </b-select>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="pull">Pull</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PullModal',
  methods: {
    pull () {
      this.$store.dispatch('git_pull', this.selection)
      this.$parent.close()
    }
  },
  data () {
    return {
      remotes: this.$store.state.Vcs.remotes,
      selection: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
