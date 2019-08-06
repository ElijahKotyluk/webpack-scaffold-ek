<template>
  <div>
    <hello-world :greet="greet" />
  </div>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    greet: 'Welcome to your new Vue project',
  }),
  mounted() {
    console.log('Current route:', this.$route.name);
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}
</style>
