<template>
<select v-model="variables.visualization">
  <option value="relief">Relief</option>
  <option value="contours">Contours</option>
  <option value="shaded">Shaded</option>
</select>
<div v-if="variables.visualization == 'relief'">
  <label>Vertical Exaggeration</label><input v-model.number="variables.vert" type="range" min="1" max="5">
  <input v-model.number="variables.sunEl" type="range" min="0" max="90">
  <input v-model.number="variables.sunAz" type="range" min="0" max="360">
</div>
<div v-else-if="variables.visualization == 'contours'">
  <select v-model="variables.colorscale">
    <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
  </select>
  <input v-model.number="variables.offset" type="range" min="0" max="200">
  <input v-model.number="variables.spacing" type="range" min="0" max="500">
  <input v-model.number="variables.min" type="range" min="0" max="8800">
  <input v-model.number="variables.max" type="range" min="0" max="8800" step="10">
</div>
<div v-else-if="variables.visualization == 'shaded'">
  <select v-model="variables.colorscale">
    <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
  </select>
  <input v-model.number="variables.min" type="range" min="0" max="8800">
  <input v-model.number="variables.max" type="range" min="0" max="8800" step="10">
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