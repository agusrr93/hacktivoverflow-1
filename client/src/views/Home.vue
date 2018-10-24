<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{data}}
    <button @click="sendData">Send Yes</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      name: 'Dani'
    }
  },
  created () {
    this.getData()
  },
  computed: {
    ...mapState(['people']),
    data () {
      return this.people
    }
  },
  methods: {
    ...mapActions(['loadData', 'sendYes']),
    getData () {
      this.loadData()
    },
    sendData () {
      this.sendYes(this.name)
    }
  }
}
</script>
