import { connect } from 'vuex-connect'
import types from '../store/types'
import ThemeSwitcher from '../components/ThemeSwitcher'

export default connect({
  stateToProps: {
    themes: 'themes',
  },
  mutationsToEvents: {
    select: types.SET_THEME,
  },
})(ThemeSwitcher)
