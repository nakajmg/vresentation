export default {
  name: 'TalkList',
  data() {
    return {
      talks: [],
    }
  },
  async created() {
    await fetch('/talks/talks.json')
      .then(res => res.json())
      .then(talks => {
        this.talks = talks
        return talks
      })
  },
  render(h) {
    return (
      <ul style="font-size: 2vw;margin: 1em;">
        {this.talks.map(({ slug, title }) => (
          <li>
            <router-link to={{ name: 'SlideTop', params: { slug } }}>{title}</router-link>
          </li>
        ))}
      </ul>
    )
  },
}
