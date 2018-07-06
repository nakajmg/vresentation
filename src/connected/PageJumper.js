import { connect } from 'vuex-connect'
import PageJumper from '../components/PageJumper.vue'

export default connect({
  gettersToProps: {
    page: 'page',
    pagesHeading: 'pagesHeading',
  },
})(PageJumper)
