import { connect } from 'vuex-connect'
import Renderer from '../Renderer.vue'

export default connect({
  gettersToProps: {
    meta: 'currentContentMeta',
    content: 'currentPageContent',
    isStartPage: 'isStartPage',
    filterStyle: 'filterStyle',
  },
  stateToProps: {
    theme: 'theme',
  },
})(Renderer)
