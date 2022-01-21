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
  <div class="input-row">
    <label>
      Colorscale
      <select v-model="variables.colorscale">
        <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
      </select>
    </label>
    <canvas v-if="variables.visualization !== 'relief'" ref="colormap-preview"></canvas>
  </div>
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
  <div class="input-row">
    <label>
      Colorscale
      <select v-model="variables.colorscale">
        <option v-for="colormap in availableColormaps" :key="colormap" :value="colormap">{{colormap}}</option>
      </select>
    </label>
    <canvas v-if="variables.visualization !== 'relief'" ref="colormap-preview"></canvas>
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
</template>

<script>
import colormap from 'colormap';
import * as colormaps from 'colormap/colorScale.js'

export default {
  props: {
    tiffUrl: String,
    variables: Object,
  },
  data() {
    return {
      availableColormaps: Object.keys(colormaps).sort(),
    }
  },
  mounted() {
    this.renderColorscalePreview();
  },
  methods: {
    renderColorscalePreview() {
      const newColorscale = this.variables.colorscale;
      const canvas = this.$refs['colormap-preview'];
      const ctx = canvas.getContext('2d');
      const nshades = 48;
      const cmap = colormap({
        colormap: newColorscale,
        nshades,
        format: 'rgbaString',
      });
      canvas.width = 480;
      canvas.height = 40
      for (let j = 0; j < nshades; j++) {
        ctx.fillStyle = cmap[j];
        ctx.fillRect(j*10, 0, 10, 40);
      }

    },
  },
  watch: {
    'variables.colorscale'() {
      this.renderColorscalePreview();
    },
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