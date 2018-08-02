import { connect } from 'vuex-connect'
import Renderer from '../Renderer.vue'

export default connect({
  gettersToProps: {
    filterStyle: 'filterStyle',
    isStartPage: 'isStartPage',
    content: 'content',
    meta: 'meta',
  },
  stateToProps: {
    theme: 'theme',
  },
})(Renderer)
