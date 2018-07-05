<script>
import { mapGetters } from 'vuex'
import className from '../modules/className'
import types from '../store/types'
import TitlePage from '../connected/TitlePage.js'
import ContentPage from '../connected/ContentPage.js'
import PageNavigator from '../connected/PageNavigator.js'
import PagePosition from '../connected/PagePosition.js'
import ThemeSwitcher from '../connected/ThemeSwitcher.js'
import ScaleSwitcher from '../connected/ScaleSwitcher.js'
export default {
  name: 'SlideContainer',
  render(h) {
    return (
      <section class={className(this)}>
        <header class={className(this, 'Header')}>
          <ScaleSwitcher class="ScaleSwitcher" />
          <ThemeSwitcher class="ThemeSwitcher" />
        </header>
        <main class={className(this, 'Main')}>
          {this.isStartPage ? <TitlePage /> : <ContentPage />}
        </main>
        <footer class={className(this, 'Footer')}>
          <PageNavigator class="PageNavigator" />
          <PagePosition class="PagePosition" />
        </footer>
      </section>
    )
  },
  created() {
    this.fetchContent()
  },
  computed: {
    ...mapGetters(['slug', 'isStartPage']),
  },
  methods: {
    fetchContent() {
      this.$store.dispatch(types.FETCH_MARKDOWN, { slug: this.slug })
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
  },
}
</script>

<style lang="stylus" scoped>
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
}
</style>
