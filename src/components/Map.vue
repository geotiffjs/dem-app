<template>
  <div id="map" ref="map">
    <slot></slot>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { WMTS } from "ol/source";
import { optionsFromCapabilities } from "ol/source/WMTS";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import GeoTIFF from "ol/source/GeoTIFF";
import WebGLTileLayer from "ol/layer/WebGLTile";
import { defaults as defaultControls } from "ol/control";
import colormap from "colormap";

import { contours, relief, shaded } from "../expressions";

export default {
  props: {
    variables: Object,
    tiffUrl: String,
  },
  async mounted() {
    await this.initiateMap();
  },
  computed: {
    renderVariables() {
      if (this.variables.visualization == "relief") {
        return {
          vert: this.variables.vert,
          sunEl: this.variables.sunEl,
          sunAz: this.variables.sunAz,
        };
      } else if (this.variables.visualization == "contours") {
        return {
          offset: this.variables.offset,
          spacing: this.variables.spacing,
          min: this.variables.min,
          max: this.variables.max,
        };
      } else if (this.variables.visualization == "shaded") {
        return {
          min: this.variables.min,
          max: this.variables.max,
        };
      }
    },
    renderStyle() {
      if (this.variables.visualization == "relief") {
        return relief(-9999, "vert", "sunEl", "sunAz");
      } else if (this.variables.visualization == "contours") {
        const cmap = colormap({
          colormap: this.variables.colorscale,
          format: "rgba",
          nshades: 16,
        });
        return contours(cmap, -9999, "offset", "spacing", "min", "max");
      } else if (this.variables.visualization == "shaded") {
        const cmap = colormap({
          colormap: this.variables.colorscale,
          format: "rgba",
          nshades: 16,
        },);
        return shaded(cmap, -9999, "min", "max");
      }
    },
  },
  watch: {
    "variables.visualization"() {
      this.demLayer.styleVariables_ = this.renderVariables;  // TODO: delete shim once OL supports this
      this.demLayer.setStyle({
        color: this.renderStyle,
        variables: this.renderVariables,
      });
    },
    "variables.colorscale"() {
      if (this.variables.visualization !== "relief") {
        this.demLayer.styleVariables_ = this.renderVariables;  // TODO: delete shim once OL supports this
        this.demLayer.setStyle({
          color: this.renderStyle,
          variables: this.renderVariables,
        });
      }
    },
    renderVariables(vars) {
      this.demLayer.updateStyleVariables(vars);
    },
  },
  methods: {
    resetDemSource() {
      this.demSource = new GeoTIFF({
        normalize: false,
        sources: [
          {
            url: this.tiffUrl,
            nodata: -9999,
          },
        ],
      });
      this.demSource.setAttributions("European Environment Agency (EAA)");
      if (this.demLayer) {
        this.demLayer.setSource(this.demSource);
      }
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
    },
    async initiateMap() {
      const response = await fetch(
        "https://tiles.maps.eox.at/wmts/1.0.0/WMTSCapabilities.xml"
      );
      const capabilities = new WMTSCapabilities().read(await response.text());
      const backgroundLayerName = "s2cloudless-2020";
      const attribution = capabilities.Contents.Layer.filter(
        (l) => l.Identifier === backgroundLayerName
      )[0].Abstract;
      const options = optionsFromCapabilities(capabilities, {
        layer: backgroundLayerName,
        matrixSet: "EPSG:4326",
      });
      const raster = new TileLayer({
        source: new WMTS({
          attributions: attribution,
          ...options,
        }),
      });

      this.source = new GeoTIFF({
        normalize: false,
        sources: [
          {
            url: this.tiffUrl,
            nodata: -9999,
          },
        ],
      });
      this.source.setAttributions("European Environment Agency (EAA)");
      // const attribution = new Attribution({
      //   collapsible: false,
      // });
      this.map = new Map({
        target: this.$refs.map,
        controls: defaultControls({ attribution: true }), //.extend([attribution]),
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
  },
};
</script>

<style>
#map {
  height: 100%;
}
</style>
