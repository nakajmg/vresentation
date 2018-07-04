export default {
  name: 'TalkList',
  data() {
    return {
      talks: [],
    }
  },
  async created() {
    await fetch('/static/talks/talks.json')
      .then(res => res.json())
      .then(talks => {
        this.talks = talks
        return talks
      })
  },
  render(h) {
    return (
      <ul>
        {this.talks.map(({ slug, title }) => (
          <li>
            <router-link to={{ name: 'SlideTop', params: { slug } }}>{title}</router-link>
          </li>
        ))}
      </ul>
    )
  },
}
