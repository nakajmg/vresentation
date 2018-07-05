<script>
export default {
  functional: true,
  props: {
    pageContent: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
    },
  },
  render(h, { props, data }) {
    const klass = data.class ? `ContentPage ${data.class}` : 'ContentPage'
    const { pageContent } = props
    return h('div', {
      ...data,
      class: klass,
      domProps: { innerHTML: pageContent },
    })
  },
}
</script>
<style lang="stylus">
.ContentPage {
  > h1, > h2, > h3, > h4, > h5 {
    position: relative;
    margin-top: 0;
    margin-bottom: 0.5em;
    line-height: 1.24;
    z-index: 1;
  }

  h2 {
    font-size: 1.5em;

    // &:after {
    // content: '';
    // display: block;
    // border-bottom: 1px solid currentColor;
    // margin-top: 0.3em;
    // opacity: 0.1;
    // }
    &:empty {
      display: none;
    }
  }

  h3 {
    font-size: 1.5em;
    text-align: center;
    margin: auto 0;
  }

  h4 {
    font-size: 1em;
  }

  // border: 1px solid aqua;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  font-size: 2.2em;
  box-sizing: border-box;
  word-break: break-all;
  overflow-x: scroll;

  [class*='language-'] {
    width: 100%;
    box-sizing: border-box;
  }

  ul {
    line-height: 1.75;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    display: block;
  }

  p {
    position: relative;

    &:empty {
      display: none;
    }

    margin-top: 0;
  }

  a:link, a:visited {
    color: #1e90ff;
    text-decoration: none;
  }

  :not([class*='language-']) code {
    color: #d14;
    padding: 0 0.2em;
    background-color: rgba(#999, 0.1);
    border: 1px solid rgba(#999, 0.5);
    border-radius: 3px;
  }

  .custom-block {
    &.center {
      display: flex;
      flex-direction: column;
      margin: auto auto;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    &.left {
      // margin: auto 0;
      h2, h3, h4 {
        margin-bottom: 0.5em;
      }

      img {
        float: left;
        width: 50%;
        margin-right: 0.5em;
      }

      &:after {
        content: '';
        display: table;
        clear: both;
      }
    }

    &.right {
      // margin: auto 0;
      h2, h3, h4 {
        margin-bottom: 0.5em;
      }

      img {
        float: right;
        width: 50%;
        margin-right: 0.5em;
      }

      &:after {
        content: '';
        display: table;
        clear: both;
      }
    }

    &.bg, &.cover {
      .background {
        z-index: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }

      .foreground {
        z-index: 1;
        position: relative;
      }

      ~ * {
        position: relative;
        z-index: 1;
      }
    }
  }
}
</style>
