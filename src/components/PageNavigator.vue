<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faArrowLeft,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faArrowRight, faArrowLeft, faArrowAltCircleRight, faArrowAltCircleLeft)
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
    FontAwesomeIcon,
  },
  render(h) {
    return (
      <nav class={className(this)}>
        <a class={className(this, 'Button')} onClick={this.prev} disabled={this.isStartPage}>
          <FontAwesomeIcon icon="arrow-alt-circle-left" />
        </a>
        <a class={className(this, 'Button')} onClick={this.next} disabled={this.isEndPage}>
          <FontAwesomeIcon icon="arrow-alt-circle-right" />
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
  bottom: 8px;
  right: 0;

  &_Button {
    font-size: 3em;
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
}
</style>
