<script>
export default {
  name: 'TitlePage',
  functional: true,
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },
  render(h, { props, data }) {
    const { title, author, location, date } = props.meta
    return (
      <div class="titlepage">
        <h1>{title}</h1>
        <div>
          {date} {location} {author}
        </div>
      </div>
    )
  },
}
</script>

<style lang="stylus">
.titlepage {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 4em;
    text-align: center;
  }
}
</style>
