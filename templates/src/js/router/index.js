import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '../App.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
    },
  ],
});
