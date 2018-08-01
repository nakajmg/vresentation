import { connect } from 'vuex-connect'
import PagePosition from '../PagePosition.vue'

export default connect({
  gettersToProps: {
    page: 'page',
    pages: 'currentPages',
  },
  stateToProps: {
    theme: 'theme',
  },
})(PagePosition)
