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
    HelloWorld
  },
  data: () => ({
    greet: 'Hello World!'
  })
}
</script>
