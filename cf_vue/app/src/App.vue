<template>
  <div id="app">
    <!-- mutations -->
    <p>{{ $store.getters['getCount'] }}</p>
    <button @click="add">+</button>
    <!-- Directivas personalizadas -->
    <input type="text" v-width="'400px'">
    <!-- Filtros -->
    <section>
      <p>{{ name | uppercase }}</p>
      <input type="text" v-model="name">
    </section>
    <!-- Vue Router -->
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
    <!-- transiciones y animaciones -->
    <TransitionComponent></TransitionComponent>
    <!-- validación -->
    <Validate></Validate>
    <!-- slots en componentes -->
    <Example>
      <template v-slot:link>
        <a href="http://codigofacilito.com">Codigo facilito</a>
      </template>

      <template v-slot:paragraph>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor magna aliqua.</p>
      </template>
    </Example>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Example from './components/Example.vue'
import Validate from './components/Validate.vue'
import TransitionComponent from "./components/TransitionComponent.vue";

export default {
  name: 'App',

  data() {
    return {
      name: ""
    }
  },

  components: {
    HelloWorld,
    Example,
    Validate,
    TransitionComponent
  },

  filters: {
    uppercase: function(value) {
      if(!value) return '';
      return value.toString().toUpperCase();
    }
  },

  directives: {
    width: {
      inserted: function (el, binding) {
        el.style.width = binding.value;
      }
    }
  },

  methods: {
    add: function () {
      this.$store.commit('increment');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
