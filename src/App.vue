<template>
  <div class="cell cell-map">
    <Map :variables="variables" :tiffUrl="tiffUrl" />
  </div>
  <div class="cell cell-edit">
    <DemControl :variables="variables" :tiffUrl="tiffUrl"></DemControl>
  </div>
  <div class="cell cell-inspect">
    <div>{{ tiffUrl }}{{ variables }}</div>
  </div>
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
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  display: grid;
  grid-template-columns: 100vh;
  grid-auto-rows: 1fr;
  grid-gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.cell {
  border-radius: 4px;
  background-color: lightgrey;
  overflow: hidden;
  padding: 1rem;
}

.cell-map {
  grid-column: 1;
  grid-row-start: 1;
  grid-row-end: 3;
  padding: 0;
}

.cell-edit {
  grid-column: 2;
  grid-row: 1;
}

.cell-inspect {
  grid-column: 2;
  grid-row: 2;
}
</style>
