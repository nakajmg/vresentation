<script>
import frontmatter from 'frontmatter'
import TitlePage from './TitlePage.vue'
import ContentPage from './ContentPage.vue'
import PageNavigator from './PageNavigator.vue'
import PagePosition from './PagePosition.vue'
import ThemeSwitcher from './ThemeSwitcher'
import MD from '../markdown/index'
import { upperFirst, compact } from 'lodash-es'
import className from '../modules/className.js'
export default {
  name: 'SlidePage',
  components: {
    TitlePage,
    ContentPage,
    PageNavigator,
    PagePosition,
    ThemeSwitcher,
  },
  data() {
    return {
      meta: {},
      contents: [],
      themes: ['Light', 'Dark'],
      theme: 'Light',
    }
  },
  render(h) {
    return (
      <section class={`${className(this)} ${this.themeClass}`}>
        <transition name="fade" mode="out-in">
          {this.isStartPage ? (
            <TitlePage class={className(this, 'Content')} meta={this.meta} theme={this.theme} />
          ) : (
            this.contents.map(
              (content, index) =>
                this.page === index + 1 ? (
                  <ContentPage
                    class={className(this, 'Content')}
                    content={content}
                    key={index}
                    theme={this.theme}
                  />
                ) : null,
            )
          )}
        </transition>
        <ThemeSwitcher themes={this.themes} handleChange={this.changeTheme} />
        <PageNavigator length={this.contentsLength} page={this.page} theme={this.theme} />
        <PagePosition length={this.contentsLength} page={this.page} theme={this.theme} />
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
  async created() {
    await fetch(`/static/talks/${this.$route.params.slug}/index.md`)
      .then(res => res.text())
      .then(md => {
        const mdit = MD()
        const parsed = frontmatter(md)
        const rendered = mdit.render(parsed.content)
        const contents = compact(rendered.split('<h2>')).map(content => `<h2>${content}`)
        if (parsed.data === null) {
          const matched = rendered.match(/<h[1,2]>(.*?)<\/h[1,2]>\n/)
          parsed.data = {
            title: matched[1],
          }
        }
        this.meta = parsed.data
        this.contents = contents
      })
  },
  methods: {
    changeTheme(theme) {
      this.theme = theme
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
    height: 720px;
    max-width: 960px;
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
