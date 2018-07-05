import { connect } from 'vuex-connect'
import PagePosition from '../components/PagePosition.vue'

export default connect({
  gettersToProps: {
    page: 'page',
    pages: 'pages',
  },
  stateToProps: {
    theme: 'theme',
  },
})(PagePosition)
