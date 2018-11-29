<template>
<div class="tile is-ancestor">
  <div v-for="item in synopsis" :key="item.id" class="tile is-parent">
    <div class="tile is-child box notification is-primary">
      <p class="title">Title</p>
      <textarea :id="item.id" type="text" :value="item.content" @input="updateSynopsis"></textarea>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'Corkboard',
  data () {
    return {
      synopsis: this.$store.state.Book.synopsis
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
  font-size: 1.2em;
}
</style>
