<script>
import Icon from './Icon.js'
import className from '../modules/className'
export default {
  name: 'PageNavigator',
  props: {
    length: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
    },
  },
  components: {
    Icon,
  },
  render(h) {
    return (
      <nav class={className(this)}>
        <a class={className(this, 'Button')} onClick={this.prev} disabled={this.isStartPage}>
          <Icon icon="angle-left" />
        </a>
        <span class={className(this, 'Counter')}>{this.page}</span>
        <a class={className(this, 'Button')} onClick={this.next} disabled={this.isEndPage}>
          <Icon icon="angle-right" />
        </a>
      </nav>
    )
  },
  mounted() {
    this._bindShortcutKey()
    this._startWatch()
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    isStartPage() {
      return this.page === 0
    },
    isEndPage() {
      return this.page === this.length
    },
  },
  methods: {
    _bindShortcutKey() {
      this.$mousetrap.bind(['right', 'space'], this.next)
      this.$mousetrap.bind(['left', 'shift+space'], this.prev)
    },
    _startWatch() {
      this.$watch(
        'page',
        () => {
          if (this.page !== 0) return
          this.replaceToTop()
        },
        {
          immediate: true,
        },
      )
    },
    next() {
      if (this.isEndPage) return
      const page = this.page + 1
      this.navigate({ page })
    },
    prev() {
      if (this.isStartPage) return
      const page = this.page - 1
      this.navigate({ page })
    },
    navigate({ page }) {
      this.$router.push({
        name: 'Slide',
        params: {
          slug: this.slug,
          page,
        },
      })
    },
    replaceToTop() {
      this.$router.replace({
        name: 'SlideTop',
        params: {
          slug: this.slug,
        },
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.PageNavigator {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &_Button {
    font-size: 2.5em;
    opacity: 0.3;
    margin: 0.3em;
    cursor: pointer;
    transition: opacity ease 200ms;

    &:hover {
      opacity: 0.7;
    }

    &[disabled] {
      cursor: none;
      opacity: 0.1;
    }
  }

  &_Counter {
    width: 20px;
    text-align: center;
    opacity: 0.3;
    font-family: sans-serif;
    font-weight: 600;
  }
}
</style>
