<script>
export default {
  name: 'App',
  render(h) {
    return (
      <div id="app">
        <router-view />
      </div>
    )
  },
}
</script>

<style lang="stylus">
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  margin: 0;
}

#app {
  height: 100%;
}

@require './theme.styl';
</style>
