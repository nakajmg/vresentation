import { connect } from 'vuex-connect'
import Renderer from '../Renderer.vue'

export default connect({
  stateToProps: {
    theme: 'theme',
    content: 'content',
    meta: 'meta',
    hasPrevPage: 'hasPrevPage',
    filter: 'filter',
  },
})(Renderer)
