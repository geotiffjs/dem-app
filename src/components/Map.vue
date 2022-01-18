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


const grey = ['band', 1];

function normalize(value, min = 360, max = 700) {
  return ['/', ['-', value, min], max - min];
}

function elevation(xOffset, yOffset) {
  return ['band', 1, xOffset, yOffset];
}

// relief

const dp = ['*', 2, ['resolution']];
const z0x = ['*', ['var', 'vert'], elevation(-1, 0)];
const z1x = ['*', ['var', 'vert'], elevation(1, 0)];
const dzdx = ['/', ['-', z1x, z0x], dp];
const z0y = ['*', ['var', 'vert'], elevation(0, -1)];
const z1y = ['*', ['var', 'vert'], elevation(0, 1)];
const dzdy = ['/', ['-', z1y, z0y], dp];
const slope = ['atan', ['^', ['+', ['^', dzdx, 2], ['^', dzdy, 2]], 0.5]];
const aspect = ['clamp', ['atan', ['-', 0, dzdx], dzdy], -Math.PI, Math.PI];
const sunEl = ['*', Math.PI / 180, ['var', 'sunEl']];
const sunAz = ['*', Math.PI / 180, ['var', 'sunAz']];

const cosIncidence = [
  '+',
  ['*', ['sin', sunEl], ['cos', slope]],
  ['*', ['*', ['cos', sunEl], ['sin', slope]], ['cos', ['-', sunAz, aspect]]],
];

function prepScale(name, min = 0, max = 1) {
  const cmap = colormap({colormap: name, format: 'rgba'})
  const diff = max - min;
  const step = 1 / (cmap.length);
  const out = [];
  out.push(min);
  out.push([0, 0, 0, 0]);
  for (let i = 0; i < cmap.length; ++i) {
    out.push((i * step * diff) + min);
    out.push(cmap[i]);
  }
  out.push(max);
  out.push([0, 0, 0, 0]);
  return out;
}


function glfloor(n) {
  return ['-', n, ['%', n, 1]];
}

function diff(a, b) {
  return ['abs', ['-', a, b]];
}

function contspace(v) {
  return glfloor(['/', ['+', v, ['var', 'offset']], ['var', 'spacing']]);
}



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
        return [
          'color',
          ['*', 255, cosIncidence],
          ['*', 255, cosIncidence],
          ['*', 255, cosIncidence],
        ];
      }
      else if (this.variables.visualization == 'contours') {
        return [
          'interpolate',
          ['linear'],
          [
            '*',
            [
              'clamp',
              [
                '+',
                diff(
                  contspace(['band', 1]),
                  contspace(elevation(1, 0))
                ),
                diff(
                  contspace(['band', 1]),
                  contspace(elevation(0, 1))
                ),
              ],
              0,
              1,
            ],
            ['band', 1],
          ],
          ...prepScale(this.variables.colorscale, 360, 700)
        ];
      }
      else if (this.variables.visualization == 'shaded') {
        return [
          'interpolate',
          ['linear'],
          grey,
          ...prepScale(this.variables.colorscale, 500, 600)
        ];
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