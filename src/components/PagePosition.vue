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
      <div class={className(this)}>
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
  background-color: rgba(0, 0, 0, 0.2);

  &_ProgressBar {
    height: 100%;
    background-color: #fff;
    transition: width ease-out 200ms;
  }
}
</style>
