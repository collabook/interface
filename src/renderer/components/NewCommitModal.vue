
<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Commit Message</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Message</label>
          <b-field>
            <b-input
                   type="text"
                    :value="message"
                    placeholder="Enter a commit message"
                    v-model="message"
                    required>
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="commit">Create Commit</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NewAuthorModal',
  methods: {
    commit () {
      this.$store.dispatch('git_commit', this.message)
      this.$parent.close()
    }
  },
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
