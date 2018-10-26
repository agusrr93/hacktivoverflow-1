<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-success mb-3">
    <a class="navbar-brand" href="#">Question Overflow </a>
    <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse"
      data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">

      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link" to="/list">Dashboard <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to=/articles>My Question<span class="sr-only">(current)</span></router-link>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" v-model="search" placeholder="Search">
        <button class="btn btn-outline-primary my-2 my-sm-0 text-white" v-if="isLogin" data-toggle="modal" data-target="#modalUserSignIn">{{user.name}}</button>
        <button class="btn btn-outline-primary my-2 my-sm-0 text-white" v-if="isLogin" @click="doLogout" type="submit">Sign Out</button>
        <button class="btn btn-outline-primary my-2 my-sm-0 text-white" v-if="!isLogin" type="submit" data-toggle="modal" data-target="#modalSignIn">Sign In</button>
        <button class="btn btn-outline-primary my-2 my-sm-0 text-white" v-if="!isLogin" type="submit" data-toggle="modal" data-target="#modalSignUp">Sign Up</button>
      </div>
      <!-- Modal signin -->
      <div class="modal fade" id="modalSignIn" tabindex="-1" role="dialog" aria-labelledby="modalSignInLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header  bg-success text-white">
              <h5 class="modal-title" id="modalSignInLabel"> Please, Sign In </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="email" class="form-control mb-3" placeholder="Email" v-model="email" autofocus required>
              <input type="password" class="form-control mb-3" placeholder="Password" v-model="password" required>
              <button type="button" class="btn btn-outline-primary btn-block mb-3" data-dismiss="modal" @click="doLogin">Sign In</button>
              I dont have an account, I want <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#modalSignUp">Sign Up</a>
             <div id="my-signin2" data-dismiss="modal"></div>
             
            </div>
            
          </div>
        </div>
      </div>
      <!-- Modal signup -->
      <div class="modal fade" id="modalSignUp" tabindex="-1" role="dialog" aria-labelledby="modalSignUpLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title" id="modalSignUpLabel"> Please, Sign Up </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control mb-3" placeholder="Full Name" v-model="name" autofocus required>
              <input type="email" class="form-control mb-3" placeholder="Email" v-model="email">
              <input type="password" class="form-control mb-3" placeholder="Password" v-model="password" required>
              <button type="button" class="btn btn-outline-primary btn-block mb-3" data-dismiss="modal" @click="doRegister">Sign Up</button>
              I just need <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#modalSignIn">Sign In</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal User -->
      <div class="modal fade" id="modalUserSignIn" tabindex="-1" role="dialog" aria-labelledby="modalUserSignInLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="g-signin2" data-onsuccess="onSignIn" data-dismiss="modal"></div>
            <div class="modal-header  bg-primary text-white">
              <h5 class="modal-title" id="modalUserSignInLabel"> Hallo, {{user.name}} </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'navbar',
  data () {
    return {
      search: '',
      name: '',
      email: '',
      password: '',
      fbSignInParams: {
        scope: 'email,user_likes',
        return_scopes: true
      }
    }
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  },
  methods: {
    ...mapActions(['loginIn', 'registerIn', 'destroyLogin', 'doSearch','loginGoogle']),
    doLogin () {
      let data = { email: this.email, password: this.password }
      this.loginIn(data)
    },
    doRegister () {
      let data = { name: this.name, email: this.email, password: this.password }
      this.registerIn(data)
    },
    doLogout () {
      localStorage.removeItem('token')
      this.destroyLogin()
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    },
    searching () {
      this.doSearch(this.search)
    },
    onSuccess(googleUser) {

      axios({
        url:'http://localhost:3000/users/glogin',
        method:'POST',
        data:{
          token:googleUser.Zi.id_token
        }
      })
        .then((response)=>{
           
            localStorage.setItem('token',response.data.token)
            this.loginGoogle()

        })
        .catch((err)=>{
            console.log(err)
        })
    },
    onFailure(error) {
      console.log(err);
    },
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      });
    }
  },
  watch: {
    search () {
      this.searching()
    }
  }, 
  mounted() {

    this.renderButton()
  },
}
</script>

<style>


</style>
