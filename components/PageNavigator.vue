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
    hasPrevPage: {
      type: Boolean,
      default: true,
    },
    hasNextPage: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
  },
  render(h) {
    const { toPrev, toNext, page, hasPrevPage, hasNextPage } = this
    const className = classNameHelper(this)
    return (
      <nav {...className()}>
        <button {...className('Button')} onClick={toPrev} disabled={!hasPrevPage}>
          <Icon icon="angle-left" />
        </button>
        <span {...className('Counter')}>{page}</span>
        <button {...className('Button')} onClick={toNext} disabled={!hasNextPage}>
          <Icon icon="angle-right" />
        </button>
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
      if (this.hasNextPage) this.navigate({ page: this.page + 1 })
    },
    toPrev() {
      if (this.hasPrevPage) this.navigate({ page: this.page - 1 })
    },
    navigate({ page }) {
      this.$emit('navigate', { page })
    },
  },
}
</script>

<style lang="scss" scoped>
.PageNavigator {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &_Button {
    appearance: none;
    background: none;
    outline: none;
    border: none;
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
