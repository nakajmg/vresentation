<script>
import Renderer from '../../components/connected/Renderer.js'
import types from '../../store/types.js'
export default {
  name: 'Content',
  layout: 'Slide',
  render(h) {
    return <Renderer />
  },
  head() {
    return {
      title: this.$store.getters.currentContentMeta.title,
    }
  },
}
</script>
