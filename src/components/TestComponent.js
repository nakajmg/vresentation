import styled from 'vue-styled-components'
const TestComponent = styled.div`
  color: red;
  font-size: 2em;
`
export default {
  props: {
    text: {
      type: String,
    },
  },
  functional: true,
  render: (h, { props }) => <TestComponent>{props.text}</TestComponent>,
}
