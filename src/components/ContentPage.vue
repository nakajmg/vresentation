<script>
export default {
  functional: true,
  props: {
    content: {
      type: String,
      default: '',
    },
  },
  render(h, { props, data }) {
    const { content } = props
    return h('div', {
      ...data,
      class: {
        ContentPage: true,
      },
      domProps: { innerHTML: content },
    })
  },
}
</script>
<style lang="stylus">
.ContentPage {
  > h1, > h2, > h3, > h4, > h5 {
    margin-top: 0;
  }

  h2 {
    font-size: 3em;
  }

  h3 {
    font-size: 2.5em;
  }

  h4 {
    font-size: 2em;
  }

  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  padding: 0.1em;
  box-sizing: border-box;

  [class*='language-'] {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
