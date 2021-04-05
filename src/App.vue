<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created () {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
a {
  text-decoration: none !important;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
::-webkit-scrollbar {
  width: 0px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
