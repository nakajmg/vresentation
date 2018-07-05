<script>
import Icon from './Icon.js'
import className from '../modules/className'
export default {
  name: 'ScaleSwitcher',
  props: {
    fontSize: {
      type: Number,
    },
  },
  render(h) {
    return (
      <div class={className(this)}>
        <span class={className(this, 'Button')} onClick={this.decrease}>
          <Icon icon="search-minus" />
        </span>
        <span class={className(this, 'Percent')}>{this.percent}%</span>
        <span class={className(this, 'Button')} onClick={this.increase}>
          <Icon icon="search-plus" />
        </span>
      </div>
    )
  },
  computed: {
    percent() {
      return Math.floor(this.fontSize / 2 * 100)
    },
  },
  methods: {
    increase() {
      this.$emit('increase', { fontSize: this.fontSize + 0.2 })
    },
    decrease() {
      this.$emit('decrease', { fontSize: this.fontSize - 0.2 })
    },
  },
}
</script>

<style lang="stylus" scoped>
.ScaleSwitcher {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &_Button {
    font-size: 1.5em;
    cursor: pointer;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  }

  &_Percent {
    margin: 0 1em;
    min-width: 50px;
    text-align: center;
    opacity: 0.3;
  }
}
</style>
