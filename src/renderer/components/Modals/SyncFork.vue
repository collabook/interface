<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Sync Forks</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Upstream Remote</label>
          <b-field>
            <b-input
                   type="text"
                    :value="upstream"
                    placeholder="Enter remote name to pull changes from"
                    v-model="upstream"
                    required>
            </b-input>
          </b-field>

          <label class="label">Origin Remote</label>
          <b-field>
            <b-input
                   type="text"
                    :value="origin"
                    placeholder="Enter remote name to push changes to"
                    v-model="origin"
                    required>
            </b-input>
          </b-field>

          <label class="label">Branches</label>
          <b-field>
            <b-input
                   type="text"
                    :value="branches"
                    placeholder="Enter branches to Synchronize"
                    v-model="branches"
                    required>
            </b-input>
          </b-field>

        </section>

        <footer class="modal-card-foot">
          <button class="button is-primary" @click="sync_fork">Synchronize</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SyncFork',
  methods: {
    sync_fork () {
      this.$store.dispatch('sync_fork', {upstream: this.upstream, origin: this.origin, branches: this.branches.split(',')})
      this.$parent.close()
    }
  },
  data () {
    return {
      upstream: '',
      origin: '',
      branches: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}
</style>
