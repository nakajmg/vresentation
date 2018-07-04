<script>
import frontmatter from 'frontmatter'
import TitlePage from './TitlePage.vue'
import ContentPage from './ContentPage.vue'
import PageNavigator from './PageNavigator.vue'
import PagePosition from './PagePosition.vue'
import ThemeSwitcher from './ThemeSwitcher'
import MD from '../markdown/index'
import { upperFirst } from 'lodash-es'
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
      <section class={`Slide ${this.themeClass}`}>
        <transition name="fade" mode="out-in">
          {this.isStartPage ? (
            <TitlePage meta={this.meta} theme={this.theme} />
          ) : (
            this.contents.map(
              (content, index) =>
                this.page === index + 1 ? (
                  <ContentPage content={content} key={index} theme={this.theme} />
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
        const contents = mdit
          .render(parsed.content)
          .split('<hr>')
          .map(content => content)
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

<style lang="stylus">
.Slide {
  height: 100%;
  margin: 0;
  position: relative;
  user-select: none;
  font-size: 16px;
}

.Theme_Light {
  background-color: #f2f2f2;
  color: #333;
}

.Theme_Dark {
  color: #fff;
  background-color: rgb(38, 34, 35);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 200ms;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>
