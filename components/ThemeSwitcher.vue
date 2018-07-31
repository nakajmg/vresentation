<script>
export default {
  name: 'ThemeSwitcher',
  props: {
    themes: {
      type: Array,
      default: () => [],
    },
  },
  render(h) {
    return (
      <div class="ThemeSwitcher">
        {this.themes.map(theme => (
          <button
            onClick={() => this.selectTheme(theme)}
            class={`ThemeSwitcher_Button _${theme}`}
          />
        ))}
      </div>
    )
  },
  methods: {
    selectTheme(theme) {
      this.$emit('select', { theme })
    },
  },
}
</script>

<style lang="scss" scoped>
.ThemeSwitcher {
  &_Button {
    border: 1px solid black;
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
    user-select: none;
    cursor: pointer;
    outline: none;
  }

  ._Light {
    background-color: #f2f2f2;
    color: #333;
  }

  ._Dark {
    color: #fff;
    background-color: rgb(38, 34, 35);
  }
}
</style>

