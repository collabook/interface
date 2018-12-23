<template>
  <div class="columns" id="synopsis-container">
    <div :id="item.id" class="column is-3" v-for="item in synopsis" :key="item.id">
      <div class="box notification is-primary">
        <p>{{ files[item.id].relPath == ""? files[item.id].name : files[item.id].relPath }}</p>
        <textarea :id="item.id" type="text" :value="item.content" @input="updateSynopsis" rows="3" cols="32"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Corkboard',
  data () {
    return {
      synopsis: this.$store.getters.synopsis,
      files: this.$store.state.Book.files
    }
  },
  methods: {
    updateSynopsis (e) {
      this.$store.commit({
        type: 'SYNOPSIS_CHANGE',
        id: e.target.id,
        value: e.target.value
      })
    }
  },
  created () {
    this.$messageBus.$on('saveSynopsis', () => {
      this.$store.dispatch('save_synopsis', document.activeElement.id)
    })
  }
}
</script>

<style>
textarea {
  background-color: #00d1b2;
  outline: none;
  border-color: #00d1b2;
  color: white;
  font-size: 1.1em;
  resize: none;
}

#synopsis-container {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
}
</style>
