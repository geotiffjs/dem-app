<template>
<select v-model="variables.visualization">
  <option value="relief">Relief</option>
  <option value="contours">Contours</option>
  <option value="shaded">Shaded</option>
</select>
<div v-if="variables.visualization == 'relief'">
  <label>Vertical Exaggeration</label><input type="range" min="1" max="5" v-model="variables.vert">
  <input type="range" min="0" max="90" v-model="variables.sunEl">
  <input type="range" min="0" max="360" v-model="variables.sunAz">
</div>
<div v-else-if="variables.visualization == 'contours'">
  <select v-model="variables.colorscale">
    <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
  </select>
  <input type="range" min="0" max="200" v-model="variables.offset">
  <input type="range" min="0" max="500" v-model="variables.spacing">
</div>
<div v-else-if="variables.visualization == 'shaded'">
  <select v-model="variables.colorscale">
    <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
  </select>
  <input type="range" min="0" max="200" v-model="variables.min">
  <input type="range" min="0" max="500" step="10" v-model="variables.max">
</div>
</template>

<script>
import * as colormaps from 'colormap/colorScale.js'

export default {
  props: {
    variables: Object,
  },
  data() {
    return {
      // visualization: "relief",
      availableColormaps: Object.keys(colormaps).sort(),
    }
  }
}
</script>

<style scoped>

</style>