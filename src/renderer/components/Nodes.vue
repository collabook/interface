<template>
  <div id="wrapper" v-if="this.$store.state.Book.visibility[files.name]">
      <li>
        <span @click="toggle()">{{ files.name }}</span>
        <ul v-if="files.subfolders && files.subfolders.length">
          <node v-for="child in files.subfolders" :files="child"></node>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'node',
  props: {
    files: Object
  },
  methods: {
    toggle: function () {
      console.log(this.files.name)
      this.$store.commit('TOGGLE_VISIBILITY', this.files.name)
    }
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

</style>
