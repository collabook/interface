<template>

  <div class="" id="logs-container">
    <div class="container" v-for="(log, index) in logs" :key="log.oid">
      <div class="box notification" :class="availabe_classes[index % 7]">
        <p class="title">{{ log.message }}</p>
        <p>{{ log.time }}</p>
        <div class="level">
          <p class="level-left">{{ log.author }}</p>
          <p :id="log.oid" class="level-right" @click="checkout">Checkout</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'CommitLog',
  data () {
    return {
      availabe_classes: ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-danger', 'is-twitter', 'is-dark'],
      logs: []
    }
  },
  methods: {
    checkout (e) {
      axios.post(`http://localhost:8088/gitcheckout`, {
        location: this.$store.state.Book.location,
        oid: e.target.id.toString()
      })
        .then((res) => {
          this.$store.dispatch('open_book', this.$store.state.Book.location)
          this.$router.push('startpage')
        })
        .catch((err) => {
          this.$dialog.alert(err.response.data)
        })
    }
  },
  created () {
    axios.post(`http://localhost:8088/gitlog`, {location: this.$store.state.Book.location})
      .then((res) => {
        this.logs = res.data
      })
      .catch((e) => {
        this.$dialog.alert(e.response.data)
      })
  }
}
</script>

<style scoped>
#wrapper {
  height: 100%;
}

.container {
  margin-bottom: 15px;
}

</style>
