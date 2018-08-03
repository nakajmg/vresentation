<script>
import Renderer from '../../components/connected/Renderer.js'
import types from '../../store/types.js'
import { mapState, mapGetters } from 'vuex'
import pageSplitter from '../../modules/pageSplitter.js'
import axios from 'axios'
export default {
  name: 'Content',
  layout: 'Slide',
  async fetch({ store, params }) {
    const { slug } = params
    const page = parseInt(params.page) || 0
    console.log(slug, page)
    const baseURL = process.server ? 'http://localhost:3000/api' : '/api'
    const response = await axios.get(`${baseURL}/${slug}/${page}`).then(res => res.data)
    store.commit(types.SET_RESPONSE, response)
  },
  head() {
    return this.$store.state.meta
  },
  render(h) {
    return <Renderer />
  },
}
</script>
