import { connect } from 'vuex-connect'
import PageJumper from '../PageJumper.vue'

export default connect({
  stateToProps: {
    page: 'page',
  },
  gettersToProps: {
    pagesHeading: 'currentHeading',
  },
})(PageJumper)
