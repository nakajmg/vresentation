<script>
export default {
  name: 'ScreenFilter',
  props: {
    filter: Object,
  },
  render(h) {
    const { brightness, contrast, saturate } = this.filter
    return (
      <div class="ScreenFilter">
        <div class="ScreenFilter_Item">
          Brightness
          <input
            type="range"
            max="2"
            min="0"
            step="0.1"
            name="brightness"
            value={brightness}
            onChange={this.onChange}
          />
        </div>
        <div class="ScreenFilter_Item">
          Contrast
          <input
            type="range"
            max="2"
            min="0"
            step="0.1"
            name="contrast"
            value={contrast}
            onChange={this.onChange}
          />
        </div>
        <div class="ScreenFilter_Item">
          Saturate
          <input
            type="range"
            max="2"
            min="0"
            step="0.1"
            name="saturate"
            value={saturate}
            onChange={this.onChange}
          />
        </div>
        <button class="ScreenFilter_ResetButton" onClick={this.reset}>
          RESET FILTER
        </button>
      </div>
    )
  },
  methods: {
    onChange({ target: { name, value } }) {
      this.$emit('change', { name, value: parseFloat(value) })
    },
    reset() {
      this.$emit('reset')
    },
  },
}
</script>

<style lang="scss" scoped>
.ScreenFilter {
  user-select: none;

  &_Item {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.75em;
  }

  &_ResetButton {
    background-color: #1e90ff;
    color: #fff;
    border: none;
    padding: 0.5em 1em;
    cursor: pointer;
  }
}
</style>
