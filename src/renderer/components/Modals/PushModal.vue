<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Push to remote</p>
        </header>


        <section class="modal-card-body" required>
          <b-field label="Select remote to push to">
            <b-select placeholder="Book Type" v-model="selection" expanded>
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
          <button class="button is-primary" @click="push">Push</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PushModal',
  methods: {
    push () {
      this.$store.dispatch('git_push', this.selection)
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
