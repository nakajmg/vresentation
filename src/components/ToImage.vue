<script>
import domToImage from 'dom-to-image'
export default {
  name: 'ToImage',
  props: {
    el: Object,
  },
  render(h) {
    return (
      <div>
        <button onClick={this.toImage} />
      </div>
    )
  },
  methods: {
    toImage() {
      domToImage.toPng(this.el.node).then(dataUrl => {
        console.log(dataUrl)
      })
    },
  },
}
</script>
