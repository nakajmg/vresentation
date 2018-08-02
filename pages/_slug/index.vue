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
      title: this.$store.getters.meta,
    }
  },
  render(h) {
    return <Renderer />
  },
}
</script>
