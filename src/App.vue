<template>
  <Map :variables="variables" :tiffUrl="tiffUrl">
    <aside id="dem-control">
      <DemControl :variables="variables" :tiffUrl="tiffUrl"></DemControl>
    </aside>
  </Map>
</template>

<script>
import Map from "./components/Map.vue";
import DemControl from "./components/DemControl.vue";

export default {
  name: "App",
  components: {
    Map,
    DemControl,
  },
  data() {
    return {
      tiffUrl: "./src/assets/Copernicus_DSM_30_N03_00_E016_00_DEM.tif",
      variables: {
        visualization: "shaded",
        colorscale: "jet",
        min: 360,
        max: 700,
        offset: 0,
        spacing: 100,
        vert: 1,
        sunEl: 45,
        sunAz: 45,
      },
    };
  },
};
</script>

<style>
@import "muicss/dist/css/mui.min.css";
@import "//fonts.googleapis.com/css?family=Roboto:300,400,500,700";

:root {
  --primary-color: 0, 65, 112;
}

html,
body,
#app {
  height: 100%;
}

body {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial;
}

#dem-control {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
}

/* Primary Color Overrides */
.mui-btn--primary {
  background: rgb(var(--primary-color));
}
.mui-select:focus > select,
.mui-select > select:focus,
.mui-textfield > input:focus,
.mui-textfield > textarea:focus {
  border-color: rgb(var(--primary-color));
}
.mui-select:focus > label,
.mui-select > select:focus~label,
.mui-textfield > input:focus~label,
.mui-textfield > textarea:focus~label {
  color: rgb(var(--primary-color));
}
.mui-btn--primary:hover {
  background: rgba(var(--primary-color), 0.9);
}
</style>
