<template>
  <div id="app">
    <TestComponent text="ほげほげほげ"/>
    <router-view/>
  </div>
</template>

<script>
import TestComponent from './components/TestComponent.js'
export default {
  name: 'App',
  components: {
    TestComponent,
  },
}
</script>

<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
  background-color: #0a9b94;
  color: #fff;
}

#app {
  height: 100%;
}

@require './theme.styl';
</style>
