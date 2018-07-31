import { connect } from 'vuex-connect'
import PageNavigator from '../PageNavigator.vue'

export default connect({
  gettersToProps: {
    page: 'page',
    slug: 'slug',
    isStartPage: 'isStartPage',
    isEndPage: 'isEndPage',
  },
  stateToProps: {
    theme: 'theme',
  },
})(PageNavigator)
