<script>
import className from '../modules/className'
export default {
  name: 'PagePosition',
  props: {
    length: {
      type: Number,
    },
    page: {
      type: Number,
    },
    theme: {
      type: String,
    },
  },
  computed: {
    position() {
      return this.page / this.length * 100
    },
  },
  render(h) {
    return (
      <div class={`${className(this)} ${this.theme}`}>
        <div class={className(this, 'ProgressBar')} style={`width: ${this.position}%`} />
      </div>
    )
  },
}
</script>

<style lang="stylus" scoped>
.PagePosition {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;

  &.Light {
    background-color: #f2f2f2;
  }

  &.Dark {
    background-color: #262223;
  }

  &_ProgressBar {
    height: 100%;
    background-color: inherit;
    transition: width ease-out 200ms;
    filter: invert(60%);
  }
}
</style>
