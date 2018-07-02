export default {
  props: {
    text: {
      type: String,
      default: 'hogehoge',
    },
  },
  functional: true,
  render: (h, context) => <div>{context.props.text}</div>,
}
