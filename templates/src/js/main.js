import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
