<script>
import { connect } from 'vuex-connect'
import classNameHelper from '../modules/classNameHelper'
import ThemeSwitcher from '../components/connected/ThemeSwitcher.js'
import ScreenFilter from '../components/connected/ScreenFilter.js'
import PageNavigator from '../components/connected/PageNavigator.js'
import PagePosition from '../components/connected/PagePosition.js'
import PageJumper from '../components/connected/PageJumper.js'
import vShow from '../modules/vShow.js'
import Icon from '../components/Icon.js'
import types from '../store/types.js'
const SlideContainer = {
  name: 'SlideContainer',
  props: {
    slug: {
      type: String,
    },
    isStartPage: {
      type: Boolean,
    },
    fontSize: {
      type: Number,
    },
    theme: {
      type: String,
    },
    filterStyle: {
      type: String,
    },
    visibility: {
      type: Object,
    },
  },
  render(h) {
    const className = classNameHelper(this)
    const {
      fontSize,
      isStartPage,
      navigate,
      theme,
      filterStyle,
      visibility,
      toggleSettingsVisibility,
    } = this
    return (
      <section {...className(null, `Theme_${theme}`)}>
        <no-ssr>
          <header {...className('Header')}>
            <span class="SettingsCog" onClick={toggleSettingsVisibility}>
              <Icon icon="cog" />
            </span>
            <ThemeSwitcher class="ThemeSwitcher" style={vShow(visibility.settings)} />
            <ScreenFilter class="ScreenFilter" style={vShow(visibility.settings)} />
          </header>
        </no-ssr>
        <main {...className('Main')}>
          <nuxt />
        </main>
        <no-ssr>
          <footer {...className('Footer')}>
            <PageNavigator onNavigate={navigate} class="PageNavigator" />
            <PagePosition class="PagePosition" />
          </footer>
        </no-ssr>
        <no-ssr>
          <PageJumper class="PageJumper" onNavigate={navigate} />
        </no-ssr>
      </section>
    )
  },
  mounted() {
    this._bindShortcutKey()
  },
  methods: {
    _bindShortcutKey() {
      this.$mousetrap.bind('ctrl+f', this.toggleSettingsVisibility)
    },
    navigate({ page }) {
      const name = page === 0 ? 'slug' : 'slug-page'
      this.$router.push({
        name,
        params: {
          slug: this.slug,
          page,
        },
      })
    },
    toggleSettingsVisibility() {
      const settingsVisibility = this.visibility.settings
      this.$emit(types.SET_VISIBILITY, { type: 'settings', value: !settingsVisibility })
    },
  },
}

export default connect({
  gettersToProps: {
    slug: 'slug',
    isStartPage: 'isStartPage',
    filterStyle: 'filterStyle',
  },
  stateToProps: {
    fontSize: 'fontSize',
    theme: 'theme',
    visibility: 'visibility',
  },
  mutationsToEvents: {
    [types.SET_VISIBILITY]: types.SET_VISIBILITY,
  },
})(SlideContainer)
</script>


<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
  src: url('/assets/fonts/logotypejp_corpmin.ttf') format('ttf');
}
</style>


<style lang="scss">
.SlideContainer {
  &.Theme_Light {
    background-color: #f2f2f2;
    color: #333;
  }

  &.Theme_Dark {
    color: #fff;
    background-color: #262223;
  }

  &.Theme_Light &_Header {
    background-color: rgba(#f2f2f2, 0.8);
  }
  &.Theme_Dark &_Header {
    background-color: rgba(#262223, 0.8);
  }
  &_Header {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding-right: 1rem;
    padding-top: 1rem;
    box-sizing: border-box;
    text-align: right;

    .SettingsCog {
      text-align: right;
      cursor: pointer;
      opacity: 0.3;
      font-size: 1.5em;
      &:hover {
        opacity: 1;
      }
      > svg {
        max-width: 24px;
      }
    }

    .ThemeSwitcher {
      position: relative;
      text-align: right;
      margin: 1em 0;
    }

    .ScreenFilter {
      position: relative;
      text-align: right;
    }
  }

  &_Footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;

    .PageNavigator {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .PagePosition {
      position: relative;
    }
  }

  .PageJumper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media print {
    &_Header,
    .PageJumper,
    &_Footer {
      display: none;
    }
  }
}
</style>
