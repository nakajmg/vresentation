import { connect } from 'vuex-connect'
import PageNavigator from '../PageNavigator.vue'

export default connect({
  stateToProps: {
    theme: 'theme',
    page: 'page',
    slug: 'slug',
    hasPrevPage: 'hasPrevPage',
    hasNextPage: 'hasNextPage',
  },
})(PageNavigator)
