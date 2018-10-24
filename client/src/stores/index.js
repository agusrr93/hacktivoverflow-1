import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    questions: [],
    categories: [],
    question: {}
  },
  mutations: {
    changeIsLoginAndMakeToken (state, payload) {
      state.isLogin = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setcategories (state, payload) {
      state.categories = payload
    },
    setQuestion (state, payload) {
      state.question = payload
    }
  },
  actions: {
    doSearch ({ commit }, payload) {
      axios({
        url: url + `/questions/${payload}/search`,
        method: 'get'
      })
        .then(found => {
          commit('setQuestions', found.data)
        })
        .catch(() => console.log(`Failed to get data`))
    },
    deleteQuestion ({ dispatch }, payload) {
      axios({
        url: url + `/questions/${payload}`,
        method: 'delete',
        headers: { token: localStorage.getItem('token') }
      })
        .then(() => dispatch('getQuestions'))
        .catch(() => console.log(`failed to delete`))
    },
    editQuestion ({ dispatch }, payload) {
      axios({
        url: url + `/questions/${payload.id}`,
        method: 'put',
        data: {
          title: payload.title,
          description: payload.description,
          category: payload.category
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(() => dispatch('getQuestions'))
        .catch(() => console.log(`failed to edit`))
    },
    getQuestion ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/questions/${payload}`,
        method: 'get'
      })
        .then(found => {
          commit('setQuestion', found.data)
        })
        .catch(err => console.log(err))
    },
    loginIn ({ commit }, payload) {
      axios({
        url: url + `/users/signin`,
        method: 'post',
        data: { email: payload.email, password: payload.password }
      })
        .then(found => {
          localStorage.setItem('token', found.data.token)
          commit('changeIsLoginAndMakeToken', true)
        })
        .catch(() => { console.log(`failed`) })
    },
    loginGoogle({ commit }){
        commit('changeIsLoginAndMakeToken', true)
    },
    registerIn ({ commit }, payload) {
      axios({
        url: url + `/users/signup`,
        method: 'post',
        data: { name: payload.name, email: payload.email, password: payload.password }
      })
        .then(found => {
          alert('Success')
        })
        .catch(() => { console.log(`failed to register`) })
    },
    cekUserLogin ({ commit }) {
      axios({
        url: url + `/users/one`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(found => {
          commit('setUser', found.data)
          commit('changeIsLoginAndMakeToken', true)
        })
        .catch(() => { commit('setUser', {}) })
    },
    destroyLogin ({ commit, dispatch }) {
      commit('changeIsLoginAndMakeToken', false)
      dispatch('cekUserLogin')
    },
    addQuestion ({ commit, dispatch }, payload) {
      axios({
        url: url + `/questions`,
        method: 'post',
        data: {
          title: payload.title,
          description: payload.description,
          category: payload.category
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(() => {
          dispatch('getQuestions')
        })
        .catch(() => console.log(`Failed add new question`))
    },
    getQuestions ({ commit }, payload) {
      if (payload === undefined) {
        axios({
          url: url + `/questions`,
          method: 'get'
        })
          .then(found => {
            commit('setQuestions', found.data)
          })
          .catch(() => console.log(`Failed to get data`))
      }
    },
    addCategory ({ commit }, payload) {
      axios({
        url: url + `/categories`,
        method: 'post',
        data: { name: payload },
        headers: { token: localStorage.getItem('token') }
      })
        .then(() => console.log(`Success add new category`))
        .catch(() => console.log(`Failed add new category`))
    },
    getCategories ({ commit }) {
      axios({
        url: url + `/categories`,
        method: 'get'
      })
        .then((found) => {
          commit('setcategories', found.data)
        })
        .catch(() => console.log(`Failed add new category`))
    }
  }
})
