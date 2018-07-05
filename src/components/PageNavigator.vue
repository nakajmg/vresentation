<script>
import Icon from './Icon.js'
import className from '../modules/className'
export default {
  name: 'PageNavigator',
  props: {
    theme: {
      type: String,
    },
    slug: {
      type: String,
    },
    page: {
      type: Number,
    },
    isStartPage: {
      type: Boolean,
      default: false,
    },
    isEndPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
  render(h) {
    return (
      <nav class={className(this)}>
        <a class={className(this, 'Button')} onClick={this.toPrev} disabled={this.isStartPage}>
          <Icon icon="angle-left" />
        </a>
        <span class={className(this, 'Counter')}>{this.page}</span>
        <a class={className(this, 'Button')} onClick={this.toNext} disabled={this.isEndPage}>
          <Icon icon="angle-right" />
        </a>
      </nav>
    )
  },
  mounted() {
    this._bindShortcutKey()
  },
  methods: {
    _bindShortcutKey() {
      this.$mousetrap.bind(['right', 'space'], this.toNext)
      this.$mousetrap.bind(['left', 'shift+space'], this.toPrev)
    },
    toNext() {
      if (this.isEndPage) return
      this.navigate({ page: this.page + 1 })
    },
    toPrev() {
      if (this.isStartPage) return
      this.navigate({ page: this.page - 1 })
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
  },
}
</script>

<style lang="stylus" scoped>
.PageNavigator {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

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
