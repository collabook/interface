<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New User Wizard</p>
          <p>It looks like you are using Collabook for the first time</p>
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
          
    <label class="label">Choose authentication method with remote</label>
<div class="block">
            <b-radio v-model="auth_type"
                native-value="Plain">
              Plain Text
            </b-radio>
            <b-radio v-model="auth_type"
                native-value="SSHAgent">
                SSH Agent
            </b-radio>
            <b-radio v-model="auth_type"
                native-value="SSHPath">
                SSH Key
            </b-radio>
        </div>


        <div v-if="auth_type=='Plain'">
          <label class="label">Username</label>
          <b-field>
            <b-input
                   type="text"
                    :value="username"
                    placeholder="Enter your username"
                    v-model="username"
                    required>
            </b-input>
          </b-field>

          <b-field label="Password">
            <b-input
                   type="password"
                    :value="password"
                    placeholder="Enter your password"
                    v-model="password"
                    required>
            </b-input>
          </b-field>

        </div>


        <div v-if="auth_type=='SSHPath'">
          <label class="label">Path</label>
          <b-field>
            <b-input
                   type="text"
                    :value="path"
                    placeholder="Enter path to private key"
                    v-model="path"
                    required>
            </b-input>
            <p class="control">
                <button class="button is-primary" @click="showOpenDialog">
                  <font-awesome-icon icon="folder"></font-awesome-icon>
                </button>
            </p>

          </b-field>

        </div>


        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="save">Save</button>
        </footer>
      </div>
  </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
  name: 'NewAuthorModal',
  methods: {
    save () {
      var context = {
        name: this.name,
        email: this.email,
        auth_type: this.auth_type,
        username: this.username,
        password: this.password,
        path: this.path
      }
      this.$store.dispatch('new_author', context)
      this.$parent.close()
    },
    showOpenDialog () {
      var path = dialog.showOpenDialog({properties: []})[0]
      this.path = path
    }
  },
  data () {
    return {
      name: '',
      email: '',
      auth_type: 'Plain',
      username: '',
      password: '',
      path: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

.modal-card-body {
  min-height: 428px;
}

</style>
