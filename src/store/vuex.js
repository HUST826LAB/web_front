import Vue from 'Vue';
import Vuex from 'Vuex';
import doCookie from '@/server/docookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    referee: 0,
    user_id: 0,
    group: '',
    score: 0,
  },
  mutations: {
    setReferee(state, data) {
      state.referee = data
    },
    setUser_id(state, data) {
      state.user_id = data
    },
    setGroup(state, data) {
      state.group = data
    },
    setScore(state, data) {
      state.score = data
    }
  },

})