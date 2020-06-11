import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleOne = {
  namespace: true,

  state: {
    count: 0
  },

  mutations: {
    increment(state) {
      state.count++;
    }
  },

  getters: {
    getCount: state => {
      return state.count;
    }
  },

  actions: {
    increment(context) {
      context.commit('increment');
    }
  }
}

const moduleTwo = {
  namespace: true,

  state: {
    count: 0,
    message: "Hello Module"
  },

  mutations: {
    increment(state) {
      state.count++;
    }
  },


  getters: {
    getMessage: (state) => {
      return state.message
    }
  }
}

const store = new Vuex.Store({
  modules: {
    a: moduleOne,
    b: moduleTwo
  }
});

export default store;