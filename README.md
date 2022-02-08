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

For both `dev` and production builds it is possible to set a configuration option via an environment variable:

`VITE_INITIAL_URL`: This option will set the URL of the initially loaded TIFF to view. When this option is not set, the URL fragment is used. When this is not set as well, no inital TIFF is loaded and the is started in an "empty" state.
