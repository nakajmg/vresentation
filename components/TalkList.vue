<script>
export default {
  name: 'TalkList',
  props: {
    contentsList: {
      type: Array,
    },
  },
  render(h) {
    return (
      <ul class="TalkList">
        {this.contentsList.map(({ slug, title }) => (
          <li>
            <router-link to={{ name: 'slug', params: { slug } }}>{title}</router-link>
          </li>
        ))}
      </ul>
    )
  },
}
</script>

<style lang="scss" scoped>
.TalkList {
  text-align: left;
  font-size: 2vw;
}
</style>
