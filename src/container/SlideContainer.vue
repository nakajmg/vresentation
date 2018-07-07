<script>
import classNameHelper from '../modules/classNameHelper'
import types from '../store/types'
import TitlePage from '../connected/TitlePage.js'
import ContentPage from '../connected/ContentPage.js'
import PageNavigator from '../connected/PageNavigator.js'
import PagePosition from '../connected/PagePosition.js'
import ThemeSwitcher from '../connected/ThemeSwitcher.js'
import ScaleSwitcher from '../connected/ScaleSwitcher.js'
import PageJumper from '../connected/PageJumper.js'
import { connect } from 'vuex-connect'

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
  },
  render(h) {
    const className = classNameHelper(this)
    const { fontSize, isStartPage, navigate } = this
    return (
      <section {...className()}>
        <header {...className('Header')}>
          <ScaleSwitcher class="ScaleSwitcher" />
          <ThemeSwitcher class="ThemeSwitcher" />
        </header>
        <main {...className('Main')} style={`font-size: ${fontSize}em;`}>
          {isStartPage ? <TitlePage /> : <ContentPage />}
        </main>
        <footer {...className('Footer')}>
          <PageNavigator onNavigate={navigate} class="PageNavigator" />
          <PagePosition class="PagePosition" />
        </footer>
        <PageJumper class="PageJumper" onNavigate={navigate} />
      </section>
    )
  },
  methods: {
    navigate({ page }) {
      this.$router.push({
        name: 'Slide',
        params: {
          slug: this.slug,
          page,
        },
      })
    },
  },
}

export default connect({
  gettersToProps: {
    slug: 'slug',
    isStartPage: 'isStartPage',
  },
  stateToProps: {
    fontSize: 'fontSize',
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
  &_Header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
    padding-top: 1rem;
    box-sizing: border-box;

    .ThemeSwitcher {
      position: relative;
    }

    .ScaleSwitcher {
      margin-right: 1rem;
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
