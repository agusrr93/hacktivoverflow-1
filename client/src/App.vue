<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <Management class="mb-3" v-if="user.name"></Management>
          <Category class="mb-3"></Category>
          <Popular class="mb-3"></Popular>
        </div>
        <div class="col-md-9">
          <Dashboard></Dashboard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from '@/components/headers/navbar.vue'
import Popular from '@/components/contains/Populerquestion.vue'
import Management from '@/components/contains/Managequestion.vue'
import Dashboard from '@/views/Dashboard.vue'
import Category from '@/components/contains/Category.vue'
export default {
  components: {
    Navbar, Popular, Management, Category, Dashboard
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  },
  created () {
    this.userSigninCheck()
    this.failedToken()
    this.getQuestion()
    this.getCategories()
  },
  methods: {
    ...mapActions(['loginIn', 'cekUserLogin', 'destroyLogin', 'getQuestions', 'getCategories']),
    userSigninCheck () {
      let token = localStorage.getItem('token')
      if (token) {
        this.cekUserLogin()
      }
    },
    failedToken () {
      if (this.user.name === undefined) {
        this.destroyLogin()
      }
    },
    getQuestion () {
      this.getQuestions()
    }
  },
  watch: {
    isLogin () {
      if (this.isLogin === true) {
        this.userSigninCheck()
      } else {
        this.failedToken()
      }
    }
  }
}
</script>
