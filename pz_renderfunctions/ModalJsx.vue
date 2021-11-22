<script>
export default {
  name: 'ModalJsx',

  props: {
    show: {
      type: Boolean,
      default: false,
    },

    message: {
      type: String,
      required: true
    }
  },

  methods: {
    clickCancelHandler() {
      console.log('Click on Cancel')
    },

    clickOkHandler() {
      console.log('Click on Ok')
    }
  },

  render() {
    return (this.show) ? <div class="modal">
      <p>{this.message}</p>
      <button onClick={this.clickCancelHandler}>Cancel</button>
      <button onClick={this.clickkHandler}>Ok</button>
    </div> : null
  }
}
</script>
