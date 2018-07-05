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
)

export default {
  name: 'FAIcon',
  props: {
    icon: {
      type: String,
    },
  },
  render(h) {
    return <FontAwesomeIcon icon={this.icon} />
  },
}
