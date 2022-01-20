<template>
<div class="input-row">
  <label>
    URL
    <input v-model="tiffUrl" type="text">
  </label>
</div>
<select v-model="variables.visualization">
  <option value="relief">Relief</option>
  <option value="contours">Contours</option>
  <option value="shaded">Shaded</option>
</select>
<div v-if="variables.visualization == 'relief'">
  <div class="input-row">
    <label>
      Vertical Exaggeration
      <input v-model.number="variables.vert" type="range" min="1" max="5">
    </label>
    <span class="input-value">{{variables.vert}}</span>
  </div>
  <div class="input-row">
    <label>
      Sun Elevation
      <input v-model.number="variables.sunEl" type="range" min="0" max="90">
    </label>
    <span class="input-value">{{variables.sunEl}}</span>
  </div>
  <div class="input-row">
    <label>
      Sun Azimuth
      <input v-model.number="variables.sunAz" type="range" min="0" max="360">
    </label>
    <span class="input-value">{{variables.sunAz}}</span>
  </div>
</div>
<div v-else-if="variables.visualization == 'contours'">
  <label>
    Colorscale
    <select v-model="variables.colorscale">
      <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
    </select>
  </label>
  <div class="input-row">
    <label>
      Offset
      <input v-model.number="variables.offset" type="range" min="0" max="200">
    </label>
    <span class="input-value">{{variables.offset}}</span>
  </div>
  <div class="input-row">
    <label>
      Spacing
      <input v-model.number="variables.spacing" type="range" min="0" max="500">
    </label>
    <span class="input-value">{{variables.spacing}}</span>
  </div>
  <div class="input-row">
    <label>
      Elevation Minimum
      <input v-model.number="variables.min" type="range" min="0" max="8800">
    </label>
    <span class="input-value">{{variables.min}}</span>
  </div>
  <div class="input-row">
    <label>
      Elevation Maximum
      <input v-model.number="variables.max" type="range" min="0" max="8800" step="10">
    </label>
    <span class="input-value">{{variables.max}}</span>
  </div>
</div>
<div v-else-if="variables.visualization == 'shaded'">
  <label>
    Colorscale
    <select v-model="variables.colorscale">
      <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
    </select>
  </label>
  <div class="input-row">
    <label>
      Elevation Minimum
      <input v-model.number="variables.min" type="range" min="0" max="8800">
    </label>
    <span class="input-value">{{variables.min}}</span>
  </div>
  <div class="input-row">
    <label>
      Elevation Maximum
      <input v-model.number="variables.max" type="range" min="0" max="8800" step="10">
    </label>
    <span class="input-value">{{variables.max}}</span>
  </div>
</div>
</template>

<script>
import * as colormaps from 'colormap/colorScale.js'

export default {
  props: {
    tiffUrl: String,
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
label {
  justify-content: space-between;
}
.input-row {
  display: flex;
  justify-content: space-between;
}
</style>