<template>
  <div class="container mui-panel mui-container mui-form">
    <legend>Visualization Settings</legend>
      <div class="mui-textfield">
        <label>URL</label>
        <input v-model="tiffUrl" type="text" />
      </div>
    <div class="mui-select">
      <select v-model="variables.visualization">
        <option value="relief">Relief</option>
        <option value="contours">Contours</option>
        <option value="shaded">Shaded</option>
      </select>
      <label>Mode</label>
    </div>
    <div v-if="variables.visualization == 'relief'">
      <input-slider v-model="variables.vert" label="Vertical Exaggeration" :min="1" :max="5" />
      <input-slider v-model="variables.sunEl" label="Sun Elevation" :min="0" :max="90" />
      <input-slider v-model="variables.sunAz" label="Sun Azimuth" :min="0" :max="360" />
    </div>
    <div v-else-if="variables.visualization == 'contours'">
      <div class="mui-row">
        <div class="mui-col-md-4">
          <div class="mui-select">
            <select v-model="variables.colorscale">
              <option
                v-for="colormap in availableColormaps"
                :key="colormap"
                :value="colormap"
              >
                {{ colormap }}
              </option>
            </select>
            <label>
              Colorscale
            </label>
          </div>
        </div>
        <div class="mui-col-md-8">
          <canvas
            ref="colormap-preview"
            style="width: 100%"
          ></canvas>
        </div>
      </div>
      <input-slider v-model="variables.offset" label="Offset" :min="0" :max="200" />
      <input-slider v-model="variables.spacing" label="Spacing" :min="0" :max="500" />
      <input-slider v-model="variables.min" label="Elevation Minimum" :min="0" :max="8800" />
      <input-slider v-model="variables.max" label="Elevation Maximum" :min="0" :max="8800" :step="10" />
    </div>
    <div v-else-if="variables.visualization == 'shaded'">
      <div class="mui-row">
        <div class="mui-col-md-4">
          <div class="mui-select">
            <select v-model="variables.colorscale">
              <option
                v-for="colormap in availableColormaps"
                :key="colormap"
                :value="colormap"
              >
                {{ colormap }}
              </option>
            </select>
            <label>
              Colorscale
            </label>
          </div>
        </div>
        <div class="mui-col-md-8">
          <canvas
            ref="colormap-preview"
            style="width: 100%"
          ></canvas>
        </div>
      </div>
      <input-slider v-model="variables.min" label="Elevation Minimum" :min="0" :max="8800" />
      <input-slider v-model="variables.max" label="Elevation Maximum" :min="0" :max="8800" :step="10" />
    </div>
  </div>
</template>

<script>
import colormap from "colormap";
import * as colormaps from "colormap/colorScale.js";
import InputSlider from "./InputSlider.vue";

export default {
  props: {
    tiffUrl: String,
    variables: Object,
  },
  components: {
    InputSlider,
  },
  data() {
    return {
      availableColormaps: Object.keys(colormaps).sort(),
    };
  },
  mounted() {
    this.renderColorscalePreview();
  },
  methods: {
    renderColorscalePreview() {
      const newColorscale = this.variables.colorscale;
      const canvas = this.$refs["colormap-preview"];
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const nshades = 48;
        const cmap = colormap({
          colormap: newColorscale,
          nshades,
          format: "rgbaString",
        });
        canvas.width = 480;
        canvas.height = 90;
        for (let j = 0; j < nshades; j++) {
          ctx.fillStyle = cmap[j];
          ctx.fillRect(j * 10, 0, 10, 90);
        }
      }
    },
  },
  watch: {
    "variables.visualization"(visualization) {
      if (visualization !== 'relief') {
        this.$nextTick(() => {
          this.renderColorscalePreview();
        });
      }
    },
    "variables.colorscale"() {
      this.renderColorscalePreview();
    },
  },
};
</script>

<style scoped>
.container {
  background: white;
  border-radius: 5px;
  width: 400px;
  max-width: 80vw;
}
</style>
