<template>
  <div class="container">
    <div class="panel">
      <p class="panel-heading">Choose the order to combine contents in</p>
      <draggable v-model="myArray" @start="drag=true" @end="drag=false">
        <a class="panel-block" :id="element.id" v-for="element in myArray" :key="element.id">{{element.rel_path}}</a>
      </draggable>
    </div>
    <button class="button is-primary" @click="exportBook">Export as PDF</button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Compile',
  components: {
    draggable
  },

  data () {
    return {
      myArray: [{id: 'disabled', rel_path: 'Files below this will be ignored'}]
    }
  },

  mounted () {
    this.myArray.push(...this.$store.getters.files)
  },

  methods: {
    exportBook () {
      var disabledIndex = this.myArray.findIndex(el => el.id === 'disabled')
      var filesToCompile = this.myArray.slice(0, disabledIndex)
      this.$store.dispatch('compile_book', filesToCompile)
    }
  }
}
</script>

<style scoped>
.panel {
  margin-top: 25px;
}

#disabled {
  background-color: #dbdbdb;
}

#disabled ~ a {
  background-color: #fafafa;
}
</style>
