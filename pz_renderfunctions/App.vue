<template>
  <div id="app">
    <button @click.prevent="toggleHandler">Toggle Modal</button>
    <modal-create-element :show="show">
      <h1>Modal Title</h1>
      <p>Hello World</p>
    </modal-create-element>
    <!-- <modal-jsx :show="show" message="Hello World"></modal-jsx> -->
  </div>
</template>

<script>
import ModalCreateElement from './ModalCreateElement.vue'
// import ModalJsx from './ModalJsx.vue'

export default {
  name: 'App',

  components: {
    ModalCreateElement,
    //ModalJsx
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    toggleHandler() {
      this.show =  !this.show
    }
  }
}
</script>
