import { connect } from 'vuex-connect'
import TitlePage from '../components/TitlePage.vue'

export default connect({
  gettersToProps: {
    pageMeta: 'pageMeta',
  },
})(TitlePage)
