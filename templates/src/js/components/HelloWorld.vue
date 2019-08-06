<template>
  <div class="welcome">
    <h1>{{ greet }}</h1>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a
          href="https://www.github.com/ElijahKotyluk/webpack-scaffold-ek"
          target="_blank"
          rel="noopener"
        >Github</a>
      </li>
      <li>
        <a
          href="https://www.npmjs.com/package/webpack-scaffold-ek"
          target="_blank"
          rel="noopener"
        >NPM</a>
      </li>
      <li>
        <a
          href="https://www.github.com/ElijahKotyluk"
          target="_blank"
          rel="noopener"
        >@ElijahKotyluk</a>
      </li>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
          rel="noopener"
        >Vue Docs</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    greet: {
      type: String,
      default: '',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
