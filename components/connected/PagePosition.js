import { connect } from 'vuex-connect'
import PagePosition from '../PagePosition.vue'

export default connect({
  stateToProps: {
    theme: 'theme',
    page: 'page',
    pageLength: 'pageLength',
  },
})(PagePosition)
