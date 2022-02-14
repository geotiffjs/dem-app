<template>
  <Map :variables="variables">
    <aside id="dem-control">
      <div class="ol-control" style="top: 0; right: 0">
        <button
          v-if="!showControls"
          id="expand-control"
          class="mui-btn mui-btn--primary"
          @click="showControls = true"
        >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z" />
          </svg>
        </button>
      </div>
      <DemControl
        v-if="showControls"
        :variables="variables"
      ></DemControl>
      <button
        v-if="showControls"
        id="contract-control"
        class="mui-btn"
        @click="showControls = false"
      >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20,14H4V10H20" />
        </svg>
      </button>
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
      variables: {
        tiffUrl: import.meta.env.VITE_INITIAL_URL || window.location.hash.substring(1),
        visualization: import.meta.env.VITE_INITIAL_VISUALIZATION || "shaded",
        colorscale: import.meta.env.VITE_INITIAL_COLORSCALE || "jet",
        min: parseInt(import.meta.env.VITE_INITIAL_MIN || 360),
        max: parseInt(import.meta.env.VITE_INITIAL_MAX || 700),
        offset: parseInt(import.meta.env.VITE_INITIAL_OFFSET || 0),
        spacing: parseInt(import.meta.env.VITE_INITIAL_SPACING || 100),
        vert: parseInt(import.meta.env.VITE_INITIAL_VERTICAL_EXAGGERATION || 1),
        sunEl: parseInt(import.meta.env.VITE_INITIAL_SUN_ELEVATION || 45),
        sunAz: parseInt(import.meta.env.VITE_INITIAL_SUN_AZIMUTH || 45),
      },
      showControls: window.innerWidth > 700,
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
  top: .5em;
  right: .5em;
  z-index: 1;
}

#expand-control {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

#contract-control {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0;
  margin: 0;
  padding: 20px;
  height: 50px;
}
#contract-control:hover {
  box-shadow: none;
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

.ol-control > button {
  background: rgba(var(--primary-color), 0.9);
}
.ol-control > button:hover {
  background: rgb(var(--primary-color));
}
</style>
