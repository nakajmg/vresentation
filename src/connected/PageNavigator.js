import { connect } from 'vuex-connect'
import PageNavigator from '../components/PageNavigator.vue'

export default connect({
  gettersToProps: {
    page: 'page',
    slug: 'slug',
    isStartPage: 'isStartPage',
    isEndPage: 'isEndPage',
  },
})(PageNavigator)
