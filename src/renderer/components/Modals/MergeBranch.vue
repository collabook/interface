<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Merge Branch</p>
        </header>

        <section class="modal-card-body" required>
          <b-field label="Select branch to merge with current branch">
            <b-select placeholder="Select remote" v-model="selection" expanded>
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
          <button class="button is-primary" @click="pull">Merge</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'MergeBranch',
  methods: {
    pull () {
      this.$store.dispatch('git_merge', this.selection)
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
