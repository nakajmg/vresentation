<script>
import classNameHelper from '../modules/classNameHelper'
export default {
  name: 'TitlePage',
  props: {
    pageMeta: {
      type: Object,
      default: () => ({}),
    },
    theme: {
      type: String,
    },
  },
  render(h) {
    const { title, author, location, date } = this.pageMeta
    const className = classNameHelper(this)
    return (
      <div {...className()}>
        <h1 {...className('Title')}>{title}</h1>
        <div {...className('Info')}>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &_Title {
    font-size: 4em;
    text-align: center;
  }
}
</style>
