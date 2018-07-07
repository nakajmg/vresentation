<script>
// import ToImage from './components/ToImage.vue'
export default {
  name: 'App',
  data() {
    return {
      src: null,
      el: {
        node: null,
      },
    }
  },
  // components: {
  //   ToImage,
  // },
  render(h) {
    return (
      <div id="app" ref="content">
        {/*<ToImage el={this.el} />*/}
        <router-view />
      </div>
    )
  },
  // mounted() {
  //   this.el.node = this.$refs.content
  // },
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

@font-face {
  font-family: 'corpmin';
  src: url('./assets/fonts/logotypejp_corpmin.ttf') format('ttf');
}
</style>
