const grey = ['band', 1];

function normalize(value, varMin, varMax) {
  return ['/', ['-', value, ['var', varMin]], ['-', ['var', varMax], ['var', varMin]]];
}

function elevation(xOffset, yOffset) {
  return ['band', 1, xOffset, yOffset];
}

function translateColormap(colorramp) {
  const step = 1 / (colorramp.length);
  const out = [];
  out.push(0);
  out.push([0, 0, 0, 0]);
  for (let i = 0; i < colorramp.length; ++i) {
    out.push(i * step);
    out.push(colorramp[i]);
  }
  out.push(1);
  out.push([0, 0, 0, 0]);
  return out;
}

// hack as long as there is no binding to the built-in shader function floor
function floor(n) {
  return ['-', n, ['%', n, 1]];
}

function diff(a, b) {
  return ['abs', ['-', a, b]];
}

function contspace(v, varOffset, varSpacing) {
  return floor(['/', ['+', v, ['var', varOffset]], ['var', varSpacing]]);
}

export function contours(colorramp, varOffset = 'offset', varSpacing = 'spacing', varMin = 'min', varMax = 'max') {
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
            contspace(['band', 1], varOffset, varSpacing),
            contspace(elevation(1, 0), varOffset, varSpacing)
          ),
          diff(
            contspace(['band', 1], varOffset, varSpacing),
            contspace(elevation(0, 1), varOffset, varSpacing)
          ),
        ],
        0,
        1,
      ],
      normalize(grey, varMin, varMax),
    ],
    ...translateColormap(colorramp)
  ];
}

export function relief(varVerticalExaggeration = 'vert', varSunElevation = 'sunEl', varSunAzimuth = 'sunAz') {
  const dp = ['*', 2, ['resolution']];
  const z0x = ['*', ['var', varVerticalExaggeration], elevation(-1, 0)];
  const z1x = ['*', ['var', varVerticalExaggeration], elevation(1, 0)];
  const dzdx = ['/', ['-', z1x, z0x], dp];
  const z0y = ['*', ['var', varVerticalExaggeration], elevation(0, -1)];
  const z1y = ['*', ['var', varVerticalExaggeration], elevation(0, 1)];
  const dzdy = ['/', ['-', z1y, z0y], dp];
  const slope = ['atan', ['^', ['+', ['^', dzdx, 2], ['^', dzdy, 2]], 0.5]];
  const aspect = ['clamp', ['atan', ['-', 0, dzdx], dzdy], -Math.PI, Math.PI];
  const sunEl = ['*', Math.PI / 180, ['var', varSunElevation]];
  const sunAz = ['*', Math.PI / 180, ['var', varSunAzimuth]];

  const cosIncidence = [
    '+',
    ['*', ['sin', sunEl], ['cos', slope]],
    ['*', ['*', ['cos', sunEl], ['sin', slope]], ['cos', ['-', sunAz, aspect]]],
  ];

  return [
    'color',
    ['*', 255, cosIncidence],
    ['*', 255, cosIncidence],
    ['*', 255, cosIncidence],
    // TODO: nodata to transparent
  ];
}

export function shaded(colorramp, varMin = 'min', varMax = 'max') {
  return [
    'interpolate',
    ['linear'],
    normalize(grey, varMin, varMax),
    ...translateColormap(colorramp)
  ];
}
