import { connect } from 'vuex-connect'
import types from '../store/types'
import ScaleSwitcher from '../components/ScaleSwitcher.vue'

export default connect({
  stateToProps: {
    fontSize: 'fontSize',
  },
  mutationsToEvents: {
    increase: types.SET_FONTSIZE,
    decrease: types.SET_FONTSIZE,
  },
})(ScaleSwitcher)
