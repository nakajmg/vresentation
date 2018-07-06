<script>
import Icon from './Icon.js'
import classNameHelper from '../modules/classNameHelper'
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
    const { toPrev, toNext, page, isStartPage, isEndPage } = this
    const className = classNameHelper(this)
    return (
      <nav {...className()}>
        <a {...className('Button')} onClick={toPrev} disabled={isStartPage}>
          <Icon icon="angle-left" />
        </a>
        <span {...className('Counter')}>{page}</span>
        <a {...className('Button')} onClick={toNext} disabled={isEndPage}>
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
      this.$emit('navigate', { page })
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
