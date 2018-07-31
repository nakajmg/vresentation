import { connect } from 'vuex-connect'
import types from '../../store/types.js'
import ScreenFilter from '../ScreenFilter'

export default connect({
  stateToProps: {
    filter: 'filter',
  },
  mutationsToEvents: {
    change: types.SET_FILTER,
    reset: types.RESET_FILTER,
  },
})(ScreenFilter)
