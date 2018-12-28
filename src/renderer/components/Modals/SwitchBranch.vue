<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Switch Branch</p>
        </header>


        <section class="modal-card-body" required>
          <b-field label="Select branch to switch to">
            <b-select placeholder="Select branch to switch to" v-model="selection" expanded>
              <option 
                   v-for="branch in branches"
                   :value="branch"
                   :key="branch">
              {{ branch }}
              </option>
            </b-select>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="switchBranch">Switch</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchBranch',
  methods: {
    switchBranch () {
      this.$store.dispatch('git_switch_branch', this.selection)
      this.$parent.close()
    }
  },
  data () {
    return {
      branches: this.$store.state.Vcs.branches,
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
