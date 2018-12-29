<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Rebase</p>
        </header>


        <section class="modal-card-body" required>
          <b-field label="Select remote to rebase on">
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
          <button class="button is-primary" @click="rebase">Rebase</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PullModal',
  methods: {
    rebase () {
      this.$store.dispatch('git_rebase', this.selection)
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
