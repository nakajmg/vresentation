<script>
import frontmatter from 'frontmatter'
import TitlePage from './TitlePage.vue'
import ContentPage from './ContentPage.vue'
import PageNavigator from './PageNavigator.vue'
import PagePositionBar from './PagePositionBar.vue'
import MD from '../markdown/index'
export default {
  name: 'SlidePage',
  components: {
    TitlePage,
    ContentPage,
    PageNavigator,
    PagePositionBar,
  },
  data() {
    return {
      meta: {},
      contents: [],
    }
  },
  render(h) {
    return (
      <section class="wrapper">
        {this.isStartPage ? (
          <TitlePage class="titlepage" meta={this.meta} />
        ) : (
          <ContentPage content={this.content} />
        )}
        <PageNavigator length={this.contentsLength} page={this.page} />
        <PagePositionBar length={this.contentsLength} page={this.page} />
      </section>
    )
  },
  computed: {
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
}
</script>

<style lang="stylus">
.wrapper {
  height: 100%;
  margin: 0;
  position: relative;
  user-select: none;
}
</style>
