<template>
  <div>
    <h1>{{ this.greet }}</h1>
    <hello-world :greet="greet" />
  </div>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  }
  data: () => ({
    greet: 'it worked'
  })
}
</script>
