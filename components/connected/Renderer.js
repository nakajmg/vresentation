import { connect } from 'vuex-connect'
import Renderer from '../Renderer.vue'

export default connect({
  gettersToProps: {
    filterStyle: 'filterStyle',
  },
  stateToProps: {
    theme: 'theme',
    content: 'content',
    meta: 'meta',
    hasPrevPage: 'hasPrevPage',
  },
})(Renderer)
