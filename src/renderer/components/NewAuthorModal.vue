<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New User Wizard</p>
          <p>It look like you are using Collabook for the first time</p>
        </header>

        <section class="modal-card-body">
          <label class="label">Name</label>
          <b-field>
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter your name"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

          <b-field label="Email">
            <b-input
                   type="email"
                    :value="email"
                    placeholder="Enter your email address"
                    v-model="email"
                    required>
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="save">Save</button>
        </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NewAuthorModal',
  methods: {
    save () {
      var context = {name: this.name, email: this.email}
      this.$store.dispatch('new_author', context)
      this.$parent.close()
    }
  },
  data () {
    return {
      name: '',
      email: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
