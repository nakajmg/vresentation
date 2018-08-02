<script>
import Renderer from '../../components/connected/Renderer.js'
import types from '../../store/types.js'
import { mapState, mapGetters } from 'vuex'
import pageSplitter from '../../modules/pageSplitter.js'
export default {
  name: 'Content',
  layout: 'Slide',
  fetch({ store, params }) {
    const { slug } = params
    return store.dispatch(types.FETCH_MARKDOWN, params)
  },
  head() {
    return {
      title: this.meta.title,
    }
  },
  render(h) {
    return <Renderer meta={this.meta} content={this.currentPage} isStartPage={this.isStartPage} />
  },
  computed: {
    ...mapGetters({
      currentContent: 'currentContent',
    }),
    meta() {
      if (!this.currentContent) return { title: '' }
      return this.currentContent.meta
    },
    currentPages() {
      if (!this.currentContent) return
      return pageSplitter(this.currentContent.content)
    },
    currentPage() {
      if (!this.currentPages) return ''
      const page = parseInt(this.$route.params.page) || 0
      return this.currentPages[page - 1]
    },
    isStartPage() {
      const page = parseInt(this.$route.params.page) || 0
      return page === 0
    },
  },
}
</script>
