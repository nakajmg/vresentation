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
export default {
  props: {
    length: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  render(h) {
    return (
      <nav class="navigator">
        <a class="navigator-button" onClick={this.prev} disabled={this.isStartPage}>
          <FontAwesomeIcon icon="arrow-alt-circle-left" />
        </a>
        <a class="navigator-button" onClick={this.next} disabled={this.isEndPage}>
          <FontAwesomeIcon icon="arrow-alt-circle-right" />
        </a>
      </nav>
    )
  },
  mounted() {
    this.$mousetrap.bind(['right', 'space'], this.next)
    this.$mousetrap.bind(['left', 'shift+space'], this.prev)
  },
  watch: {
    page: {
      handler() {
        if (parseInt(this.$route.params.page) !== 0) return
        this.replaceToTop()
      },
      immediate: true,
    },
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

<style lang="stylus">
.navigator {
  position: absolute;
  bottom: 8px;
  right: 0;

  .navigator-button {
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
