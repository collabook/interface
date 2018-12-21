<template>
  <div id="wrapper">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">New Book Wizard</p>
        </header>
        <section class="modal-card-body">


          <b-field label="Name">
            <b-input
                   type="text"
                    :value="name"
                    placeholder="Enter a name for the book"
                    v-model="name"
                    required>
            </b-input>
          </b-field>

          <b-field label="Select Book Type">
            <b-select placeholder="Book Type" expanded>
              <option 
                   v-for="option in options"
                   :value="option.value"
                   :key="option.id"
                   v-model="selection">
              {{ option.name }}
              </option>
            </b-select>
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
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="createBook">Create Book</button>
        </footer>
      </div>
  </div>
</template>

<script>
const { dialog } = require('electron').remote

export default {
  name: 'NewBookModal',
  methods: {
    showOpenDialog () {
      var loc = dialog.showOpenDialog({properties: ['openDirectory']})[0]
      this.location = loc
    },
    createBook () {
      var context = {location: this.location, name: this.name, genre: this.selection}
      this.$store.dispatch('new_book', context)
      this.$parent.close()
    }
  },
  data () {
    return {
      options: [
        {id: 1, name: 'Fantasy', value: 'fantasy'},
        {id: 2, name: 'Fiction', value: 'fiction'},
        {id: 3, name: 'Academic', value: 'academic'}
      ],
      location: '',
      selection: '',
      name: ''
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
