import Icon from './Icon.js'
import styled from 'vue-styled-components'

const IconButton = styled.span`
  font-size: 1.5em;
  cursor: pointer;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`
const ScalePercent = styled.span`
  margin: 0 1em;
  min-width: 50px;
  text-align: center;
  opacity: 0.3;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default {
  name: 'ScaleController',
  components: {
    Icon,
  },
  props: {
    scale: {
      type: Number,
      default: 1,
    },
    handleChange: {
      type: Function,
      default: () => {},
    },
  },
  render(h) {
    return (
      <Wrapper>
        <IconButton onClick={this.decreaseScale}>
          <Icon icon="search-minus" />
        </IconButton>
        <ScalePercent>{this.percent}%</ScalePercent>
        <IconButton onClick={this.increaseScale}>
          <Icon icon="search-plus" />
        </IconButton>
      </Wrapper>
    )
  },
  methods: {
    increaseScale() {
      this.handleChange(this.scale + 0.1)
    },
    decreaseScale() {
      this.handleChange(this.scale - 0.1)
    },
  },
  computed: {
    percent() {
      return Math.floor(this.scale * 100)
    },
  },
}
