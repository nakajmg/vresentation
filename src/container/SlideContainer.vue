<script>
import classNameHelper from '../modules/classNameHelper'
import types from '../store/types'
import TitlePage from '../connected/TitlePage.js'
import ContentPage from '../connected/ContentPage.js'
import PageNavigator from '../connected/PageNavigator.js'
import PagePosition from '../connected/PagePosition.js'
import ThemeSwitcher from '../connected/ThemeSwitcher.js'
import ScreenFilter from '../connected/ScreenFilter'
import PageJumper from '../connected/PageJumper.js'
import { connect } from 'vuex-connect'
import vShow from '../modules/vShow'
import Icon from '../components/Icon'

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
      <section {...className(null, `Theme_${theme}`)} style={filterStyle}>
        <header {...className('Header')}>
          <span class="SettingsCog" onClick={toggleSettingsVisibility}>
            <Icon icon="cog" />
          </span>
          <ThemeSwitcher class="ThemeSwitcher" style={vShow(visibility.settings)} />
          <ScreenFilter class="ScreenFilter" style={vShow(visibility.settings)} />
        </header>
        <main {...className('Main')}>{isStartPage ? <TitlePage /> : <ContentPage />}</main>
        <footer {...className('Footer')}>
          <PageNavigator onNavigate={navigate} class="PageNavigator" />
          <PagePosition class="PagePosition" />
        </footer>
        <PageJumper class="PageJumper" onNavigate={navigate} />
      </section>
    )
  },
  mounted() {
    this._bindShortcutKey()
  },
  methods: {
    _bindShortcutKey() {
      this.$mousetrap.bind('ctrl+s', this.toggleSettingsVisibility)
    },
    navigate({ page }) {
      this.$router.push({
        name: 'Slide',
        params: {
          slug: this.slug,
          page,
        },
      })
    },
    toggleSettingsVisibility() {
      const settingsVisibility = this.visibility.settings
      this.$emit('update:visibility', { type: 'settings', value: !settingsVisibility })
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
    'update:visibility': types.SET_VISIBILITY,
  },
  lifecycle: {
    created({ dispatch, getters }) {
      return dispatch(types.FETCH_MARKDOWN, { slug: getters.slug })
    },
  },
})(SlideContainer)
</script>

<style lang="stylus">
.SlideContainer {
  &.Theme_Light {
    background-color: #f2f2f2;
    color: #333;
  }

  &.Theme_Dark {
    color: #fff;
    background-color: rgb(38, 34, 35);
  }

  &_Header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
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
}
</style>
