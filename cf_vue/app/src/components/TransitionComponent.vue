<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <Fade>
      <p v-if="show">Hello</p>
    </Fade>
  </div>
</template>

<script>
import Fade from "./animations/Fade";

export default {
  data() {
    return {
      show: true
    }
  },

  components: {
    Fade
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>