<script>
export default {
  props: {
    length: {
      type: Number,
    },
    page: {
      type: Number,
    },
  },
  computed: {
    position() {
      return this.page / this.length * 100
    },
  },
  render(h) {
    return (
      <div class="positionbar">
        <div class="progressbar" style={`width: ${this.position}%`} />
      </div>
    )
  },
}
</script>

<style lang="stylus">
.positionbar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  .progressbar {
    height: 100%;
    background-color: rebeccapurple;
    transition: width ease 150ms;
  }
}
</style>
