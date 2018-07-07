<script>
import vShow from '../modules/vShow.js'
import classNameHelper from '../modules/classNameHelper.js'
export default {
  name: 'PageJumper',
  props: {
    page: { type: Number },
    pagesHeading: { type: Array },
  },
  data() {
    return {
      visibility: false,
    }
  },
  render(h) {
    const { visibility, close, pagesHeading, _currentPageClass, navigate } = this
    const className = classNameHelper(this)
    return (
      <div {...className()} style={vShow(visibility)} onClick={close}>
        <div {...className('Items')}>
          {pagesHeading.map((heading, page) => {
            return (
              <a {...className('Item', _currentPageClass(page))} onClick={() => navigate(page + 1)}>
                <span {...className('PageNumber')}>{page + 1}</span>
                <span {...className('PageHeading')}>{heading}</span>
              </a>
            )
          })}
        </div>
      </div>
    )
  },
  created() {
    this._bindShortcutKey()
  },
  methods: {
    _currentPageClass(page) {
      return this.page === page + 1 ? '_currentPage' : ''
    },
    _bindShortcutKey() {
      this.$mousetrap.bind('ctrl+g', this.toggle)
    },
    toggle() {
      this.visibility = !this.visibility
    },
    close() {
      this.visibility = false
    },
    navigate(page) {
      this.$emit('navigate', { page })
      this.close()
    },
  },
}
</script>

<style lang="stylus">
.PageJumper {
  display: flex;
  align-items: center;
  justify-content: center;

  &_Items {
    background-color: rgba(#fff, 0.9);
    color: #333;
    border-radius: 2px;
    max-height: 75%;
    overflow: scroll;
  }

  &_Item {
    display: block;
    padding: 0.5em 1em;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #1e90ff;
    }
  }

  &_PageNumber {
    margin-right: 1em;
  }

  ._currentPage {
    color: #fff;
    background-color: #d14;
  }
}
</style>
