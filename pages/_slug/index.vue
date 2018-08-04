<script>
import Renderer from '../../components/connected/Renderer.js'
import types from '../../store/types.js'
import { mapState, mapGetters } from 'vuex'
import pageSplitter from '../../modules/pageSplitter.js'
import axios from 'axios'
export default {
  name: 'Content',
  layout: 'Slide',
  async fetch({ store, params, isStatic }) {
    const { slug } = params
    const page = parseInt(params.page) || 0
    await store.dispatch(types.FETCH_HEADING, { slug })
    await store.dispatch(types.FETCH_CONTENT, { slug, page, isStatic })
  },
  head() {
    return {
      title: this.$store.state.meta.title,
    }
  },
  render(h) {
    return <Renderer />
  },
}
</script>
