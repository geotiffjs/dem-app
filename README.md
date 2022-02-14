# DEM-App

This application allows users to explore Digital Elevation Model (DEM) Data
stored in publically accessible locations in GeoTIFF format.

## Installation

To install all required dependencies use `yarn`.

```bash
yarn
```

## Development

The development server can be started using:

```bash
npm run dev
```

## Building for production

To build the application, the following command can be used:

```bash
npm run build
```

The application bundle is now located in the `dist` directory.

## Build options

For both `dev` and production builds it is possible to set a configuration option via an environment variables:

  - `VITE_INITIAL_URL`: This option will set the URL of the initially loaded TIFF to view. When this option is not set, the URL fragment is used. When this is not set as well, no inital TIFF is loaded and the is started in an "empty" state.
  - `VITE_INITIAL_VISUALIZATION`: The initially selected visualization. One of `contours`, `shaded`, and `relief`. Defaults to `shaded`.
  - `VITE_INITIAL_COLORSCALE`: The initially selected colorscale. See [colormaps documentation](https://www.npmjs.com/package/colormap) for available colorscales. Defaults to `jet`.
  - `VITE_INITIAL_MIN`: The initial value for the minimum elevation. Defaults to `360`.
  - `VITE_INITIAL_MAX`: The initial value for the maximum elevation. Defaults to `700`.
  - `VITE_INITIAL_OFFSET`: The initial value for the elevation offset for contours. Defaults to `0`.
  - `VITE_INITIAL_SPACING`: The initial value for the elevation spacing for contours. Defaults to `100`.
  - `VITE_INITIAL_VERTICAL_EXAGGERATION`: The initial value for vertical exaggeration in relief rendering. Defaults to `1`.
  - `VITE_INITIAL_SUN_ELEVATION`: The initial value for sun elevation in relief rendering. Defaults to `45`.
  - `VITE_INITIAL_SUN_AZIMUTH`: The initial value for sun azimuth in relief rendering. Defaults to `45`.
