import Vue from 'vue';
import Vuex from 'vuex';

// Vuex modules:
import example from './modules/example';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    example,
  },
});
