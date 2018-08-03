<script>
import classNameHelper from '../modules/classNameHelper'
export default {
  name: 'PagePosition',
  props: {
    page: {
      type: Number,
    },
    pageLength: {
      type: Number,
    },
    theme: {
      type: String,
    },
  },
  computed: {
    position() {
      return this.page / this.pageLength * 100
    },
  },
  render(h) {
    const className = classNameHelper(this)
    return (
      <div {...className(null, this.theme)}>
        <div {...className('ProgressBar')} style={`width: ${this.position}%`} />
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.PagePosition {
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
