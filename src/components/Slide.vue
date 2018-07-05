<script>
import TitlePage from './TitlePage.vue'
import ContentPage from './ContentPage.vue'
import PageNavigator from './PageNavigator.vue'
import PagePosition from './PagePosition.vue'
import ThemeSwitcher from './ThemeSwitcher'
import className from '../modules/className.js'
import markdownLoader from '../modules/markdownLoader.js'
import ScaleController from './ScaleController.js'
export default {
  name: 'SlidePage',
  components: {
    TitlePage,
    ContentPage,
    PageNavigator,
    PagePosition,
    ThemeSwitcher,
    ScaleController,
  },
  data() {
    return {
      meta: {},
      contents: [],
      themes: ['Light', 'Dark'],
      theme: 'Light',
      scale: 1,
    }
  },
  render(h) {
    return (
      <section class={`${className(this)} ${this.themeClass}`}>
        <transition name="fade" mode="out-in">
          {this.isStartPage ? (
            <TitlePage
              class={className(this, 'Content')}
              meta={this.meta}
              theme={this.theme}
              style={`font-size: ${this.scale * 2}em`}
            />
          ) : (
            this.contents.map(
              (content, index) =>
                this.page === index + 1 ? (
                  <ContentPage
                    class={className(this, 'Content')}
                    content={content}
                    key={index}
                    theme={this.theme}
                    style={`font-size: ${this.scale * 2}em`}
                  />
                ) : null,
            )
          )}
        </transition>
        <ThemeSwitcher themes={this.themes} handleChange={this.changeTheme} />
        <ScaleController
          class="ScaleController"
          scale={this.scale}
          handleChange={this.changeScale}
        />
        <PageNavigator length={this.contentsLength} page={this.page} theme={this.theme} />
        <PagePosition length={this.contentsLengthz} page={this.page} theme={this.theme} />
      </section>
    )
  },
  computed: {
    themeClass() {
      return `Theme_${this.theme}`
    },
    page() {
      return parseInt(this.$route.params.page) || 0
    },
    content() {
      return this.contents[this.page - 1] ? this.contents[this.page - 1] : ''
    },
    contentsLength() {
      return this.contents.length
    },
    isStartPage() {
      return this.page === 0
    },
  },
  created() {
    this.loadMarkdown()
  },
  methods: {
    async loadMarkdown() {
      const { pageMeta, pages } = await markdownLoader(this.$route.params.slug)
      this.meta = pageMeta
      this.contents = pages
    },
    changeTheme(theme) {
      this.theme = theme
    },
    changeScale(scale) {
      this.scale = scale
    },
  },
}
</script>

<style lang="scss">
@import '../markdown/prism-tomorrow.scss';
@import '../markdown/prism-okaidia.scss';
@import url(http://fonts.googleapis.com/css?family=Source+Code+Pro);
.SlidePage {
  $self: &;
  height: 100%;
  margin: 0;
  position: relative;
  user-select: none;
  font-size: 16px;
  display: flex;
  align-items: center;

  #{$self}_Content {
    flex-grow: 1;
    // height: 100%;
    min-height: 720px;
    min-width: 960px;
    margin: 0 auto;
  }

  &.Theme_Light {
    background-color: #f2f2f2;
    color: #333;

    #{$self}_Content {
      @include light;
    }
  }

  &.Theme_Dark {
    color: #fff;
    background-color: rgb(38, 34, 35);
    #{$self}_Content {
      @include dark;
    }
  }

  .ScaleController {
    position: absolute;
    top: 10px;
    right: 100px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter,
.fade-leave-to {
  /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>
