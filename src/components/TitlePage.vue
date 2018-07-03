<script>
import className from '../modules/className'
export default {
  name: 'TitlePage',
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },
  render(h) {
    const { title, author, location, date } = this.$props.meta
    return (
      <div class={className(this)}>
        <h1 class={className(this, 'Title')}>{title}</h1>
        <div class={className(this, 'Info')}>
          {date} {location} {author}
        </div>
      </div>
    )
  },
}
</script>

<style lang="stylus" scoped>
.TitlePage {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &_Title {
    font-size: 4em;
    text-align: center;
  }
}
</style>
