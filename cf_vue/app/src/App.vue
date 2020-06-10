<template>
  <div id="app">
    <Validate></Validate>
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

export default {
  name: 'App',
  components: {
    HelloWorld,
    Example,
    Validate
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
