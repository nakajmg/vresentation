import { connect } from 'vuex-connect'
import ContentPage from '../components/ContentPage.vue'

export default connect({
  gettersToProps: {
    pageContent: 'pageContent',
  },
})(ContentPage)
