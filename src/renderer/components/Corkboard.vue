<template>
  <div class="columns" id="synopsis-container">
    <div :id="item.id" class="column is-3" v-for="item in synopsis" :key="item.id">
      <div class="box notification is-primary">
        <p class="title">{{ files[item.id].name }}</p>
        <textarea :id="item.id" type="text" :value="item.content" @input="updateSynopsis" rows="3" cols="32"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: would like to have random colors on synopsis box
export default {
  name: 'Corkboard',
  data () {
    return {
      synopsis: this.$store.state.Book.synopsis,
      files: this.$store.state.Book.bookTree
    }
  },
  methods: {
    updateSynopsis (e) {
      this.$store.commit({
        type: 'SYNOPSIS_CHANGE',
        id: parseInt(e.target.id),
        value: e.target.value
      })
    }
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
