import styled from 'vue-styled-components'
const btnProps = {
  theme: String,
}

const bg = {
  Light: '#f2f2f2',
  Dark: 'rgb(38, 34, 35)',
}
const color = {
  Light: '#333',
  Dark: '#fff',
}
const SwitchButton = styled('button', btnProps)`
  border: 1px solid black;
  background-color: ${({ theme }) => bg[theme]};
  color: ${({ theme }) => color[theme]};
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  user-select: none;
  cursor: pointer;
  outline: none;
`

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
      <div>
        {this.themes.map(theme => (
          <SwitchButton onClick={() => this.selectTheme(theme)} theme={theme} />
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
