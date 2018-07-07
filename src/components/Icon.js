import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faAngleRight,
  faAngleLeft,
  faSearchPlus,
  faSearchMinus,
  faCog,
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faAngleRight,
  faAngleLeft,
  faSearchPlus,
  faSearchMinus,
  faCog,
)

export default {
  functional: true,
  name: 'FAIcon',
  props: {
    icon: {
      type: String,
    },
  },
  render(h, { props }) {
    return <FontAwesomeIcon icon={props.icon} />
  },
}
