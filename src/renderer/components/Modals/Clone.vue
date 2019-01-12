<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Download Book</p>
        </header>

        <section class="modal-card-body">
          <b-field label="URL">
            <b-input
                   type="text"
                    :value="url"
                    placeholder="Enter URL to download book from"
                    v-model="url"
                    required>
            </b-input>
          </b-field>

          <label class="label">Location</label>
          <b-field>
            <b-input
                   type="text"
                    :value="location"
                    placeholder="Enter location to save book"
                    v-model="location"
                    required>
            </b-input>
            <p class="control">
                <button class="button is-primary" @click="showOpenDialog">
                  <font-awesome-icon icon="folder"></font-awesome-icon>
                </button>
            </p>

          </b-field>


        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary" type="button" @click="clone">Download Book</button>
          <button class="button" type="button" @click="$parent.close()">Close</button>
        </footer>
      </div>
  </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
  name: 'Clone',
  methods: {
    showOpenDialog () {
      var loc = dialog.showOpenDialog({properties: ['openDirectory']})[0]
      this.location = loc
    },
    clone () {
      this.$store.dispatch('git_clone', {location: this.location, url: this.url})
      this.$parent.close()
    }
  },
  data () {
    return {
      location: '',
      url: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
