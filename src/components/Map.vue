<template>
  <div id="app">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer} from 'ol/layer';
import {WMTS, Vector as VectorSource} from 'ol/source';
import {optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import GeoTIFF from 'ol/source/GeoTIFF';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import colormap from 'colormap';

import { contours, relief, shaded } from "../expressions";


export default {
  props: {
    variables: Object,
  },
  async mounted() {
    await this.initiateMap();
  },
  computed: {
    renderVariables() {
      if (this.variables.visualization == 'relief') {
        return {
          vert: this.variables.vert,
          sunEl: this.variables.sunEl,
          sunAz: this.variables.sunAz,
        }
      }
      else if (this.variables.visualization == 'contours') {
        return {
          offset: this.variables.offset,
          spacing: this.variables.spacing,
          min: this.variables.min,
          max: this.variables.max,
        }
      }
      else if (this.variables.visualization == 'shaded') {
        return {
          min: this.variables.min,
          max: this.variables.max,
        }
      }
    },
    renderStyle() {
      if (this.variables.visualization == 'relief') {
        return relief('vert', 'sunEl', 'sunAz');
      }
      else if (this.variables.visualization == 'contours') {
        const cmap = colormap({ colormap: this.variables.colorscale, format: 'rgba', nshades: 16 });
        return contours(cmap, 'offset', 'spacing', 'min', 'max');
      }
      else if (this.variables.visualization == 'shaded') {
        const cmap = colormap({ colormap: this.variables.colorscale, format: 'rgba', nshades: 16 });
        return shaded(cmap, 'min', 'max');
      }
    }
  },
  watch: {
    'variables.visualization'() {
      this.resetDemLayer();
    },
    'variables.colorscale'() {
      if (this.variables.visualization !== 'relief') {
        this.resetDemLayer();
      }
    },
    renderVariables(vars) {
      console.log(vars);
      this.demLayer.updateStyleVariables(vars);
    }
  },
  methods: {
    async initiateMap() {
      const response = await fetch('https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml')
      const text = await response.text();
      const parser = new WMTSCapabilities();
      const options = optionsFromCapabilities(parser.read(text), {
        layer: 's2cloudless-2019',
        matrixSet: 'EPSG:4326',
      });
      const raster = new TileLayer({
        source: new WMTS(options),
      });

      this.source = new GeoTIFF({
        normalize: false,
        sources: [
          {
            url: './src/assets/Copernicus_DSM_30_N03_00_E016_00_DEM.tif',
          },
        ],
      });

      this.map = new Map({
        target: this.$refs.map,
        layers: [
          raster,
          // this.demLayer,
          // colorLayer,
          // reliefLayer,
          // contoursLayer
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [0, 0],
          zoom: 2,
        }),
      });

      const view = await this.source.getView();
      this.map.getView().fit(view.extent);
      this.resetDemLayer();
    },
    resetDemLayer() {
      if (this.demLayer) {
        this.map.removeLayer(this.demLayer);
      }
      this.demLayer = new WebGLTileLayer({
        source: this.source,
        style: {
          variables: this.renderVariables,
          color: this.renderStyle,
        },
      });
      this.map.addLayer(this.demLayer);
    }
  },
};
</script>

<style>
#map {
  /* position: absolute; */
  margin: 0;
  padding: 0;
  /* height: 50%; */
  height: 400px;
  width: 100%;
}
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
/* #nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>