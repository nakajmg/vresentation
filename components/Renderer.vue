<script>
import classNameHelper from '../modules/classNameHelper'
export default {
  name: 'Renderer',
  props: {
    content: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
    },
    isStartPage: {
      type: Boolean,
    },
    meta: {
      type: Object,
    },
    filterStyle: {
      type: String,
    },
  },
  render(h) {
    const { content, theme, isStartPage, meta, filterStyle } = this.$props
    if (isStartPage) {
      const { title, author, location, date } = meta
      return (
        <div class="TitlePage" style={filterStyle}>
          <h1 class="TitlePage_Title">{title}</h1>
          <div class="TitlePage_Info">
            {date} {location} {author}
          </div>
        </div>
      )
    } else {
      return h('div', {
        class: `ContentPage Theme_${theme}`,
        style: filterStyle,
        domProps: { innerHTML: content },
      })
    }
  },
}
</script>
<style lang="scss">
@import '../modules/markdown/prism-tomorrow.scss';
@import '../modules/markdown/prism-okaidia.scss';
@import url(http://fonts.googleapis.com/css?family=Source+Code+Pro);
.ContentPage {
  $self: &;
  > h1,
  > h2,
  > h3,
  > h4,
  > h5 {
    position: relative;
    margin-top: 0;
    margin-bottom: 0.4em;
    line-height: 1.24;
    z-index: 1;
  }

  h2 {
    // font-size: 1.5em;

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
  }

  font-size: 3.4vw;
  font-family: corpmin;
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  word-break: break-all;
  overflow-x: scroll;
  height: 100vh;
  max-width: 100vw;

  div[class*='language-'] {
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    font-size: 0.5em;
  }

  ul {
    line-height: 1.75;
    margin: 0;
    margin-left: 0.5em;
    font-size: 0.9em;
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

    margin: 0;
    padding-left: 0.5em;
  }

  a:link,
  a:visited {
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
      h2,
      h3,
      h4 {
        margin-bottom: 0.5em;
      }

      img {
        float: left;
        width: 50%;
        margin-right: 1em;
      }

      &:after {
        content: '';
        display: table;
        clear: both;
      }
    }

    &.right {
      // margin: auto 0;
      h2,
      h3,
      h4 {
        margin-bottom: 0.5em;
      }

      img {
        float: right;
        width: 50%;
        margin-left: 1em;
      }

      &:after {
        content: '';
        display: table;
        clear: both;
      }
    }

    &.bg,
    &.cover {
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

    &.bg {
      .background {
        filter: opacity(0.1);
      }
    }

    &.video {
      width: 72vw;
      height: 40.5vw;
      margin: 0 auto;

      iframe,
      video {
        width: 100%;
        height: 100%;
      }
    }
  }

  &.Theme_Light {
    @include light;
  }

  &.Theme_Dark {
    @include dark;
  }
}
.TitlePage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 3.4vw;
  font-family: corpmin;

  &_Title {
    text-align: center;
    margin: 0;
    font-size: 2em;
  }

  &_Info {
    font-size: 0.8em;
  }
}
</style>
