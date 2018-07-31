import { connect } from 'vuex-connect'
import Renderer from '../Renderer.vue'

export default connect({
  gettersToProps: {
    pageMeta: 'pageMeta',
    pageContent: 'pageContent',
    isStartPage: 'isStartPage',
  },
  stateToProps: {
    theme: 'theme',
  },
})(Renderer)
