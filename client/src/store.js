import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const $http = axios.create({
  baseURL: 'http://localhost:3000'
})

const store = new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
  },
  mutations: {
    setPost (state, photo) {
      state.posts = posts
    }
  },
  actions: {
    getPhoto (context) {
      $http.get('/photo')
        .then(photo => {
          console.log(photo)
          context.commit('setPhoto', photo.data.photo)
        })
    }
  }
})

export default store