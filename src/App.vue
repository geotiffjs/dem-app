<template>
  <Map :variables="variables"/>
  <DemControl :variables="variables"></DemControl>
  <div>{{variables}}</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Map from './components/Map.vue'
import DemControl from './components/DemControl.vue'

export default {
  name: 'App',
  components: {
    Map,
    DemControl
  },
  data() {
    return {
      variables: {
        visualization: 'shaded',
        colorscale: 'jet',
        min: 360,
        max: 700,
        offset: 0,
        spacing: 100,
        vert: 1,
        sunEl: 45,
        sunAz: 45,
      }
    };
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
  margin: 0;
  /* margin-top: 60px; */
}
body{
  padding:0;
  margin:0;
}
</style>
