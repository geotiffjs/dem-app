function normalize(value, varMin, varMax) {
  return ['/', ['-', value, ['var', varMin]], ['-', ['var', varMax], ['var', varMin]]];
}

function elevation(xOffset = 0, yOffset = 0) {
  if (xOffset === 0 && yOffset === 0) {
    return ['band', 1];
  }
  return ['band', 1, xOffset, yOffset];
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

export function contours(colorramp, nodata, varOffset = 'offset', varSpacing = 'spacing', varMin = 'min', varMax = 'max') {
  return [
    'case',
    // value between min/max
    ['between', elevation(), ['var', varMin], ['var', varMax]],
    [
      'palette',
      [
        '*',
        [
          '*',
          [
            'clamp',
            [
              '+',
              diff(
                contspace(elevation(), varOffset, varSpacing),
                contspace(elevation(1, 0), varOffset, varSpacing)
              ),
              diff(
                contspace(elevation(), varOffset, varSpacing),
                contspace(elevation(0, 1), varOffset, varSpacing)
              ),
            ],
            0,
            1,
          ],
          normalize(elevation(), varMin, varMax),
        ],
        colorramp.length + 1
      ],
      // add a transparent color in the 0 index so that all 0s map to it
      [[0, 0, 0, 0], ...colorramp]
    ],
    // out of bounds color
    ['color', 0, 0, 0, 0],
  ];
}

export function relief(nodata, varVerticalExaggeration = 'vert', varSunElevation = 'sunEl', varSunAzimuth = 'sunAz') {
  const verticalExaggeration = ['*', 0.00003, ['var', varVerticalExaggeration]];
  const dp = ['*', 2, ['resolution']];
  const z0x = ['*', verticalExaggeration, elevation(-1, 0)];
  const z1x = ['*', verticalExaggeration, elevation(1, 0)];
  const dzdx = ['/', ['-', z1x, z0x], dp];
  const z0y = ['*', verticalExaggeration, elevation(0, -1)];
  const z1y = ['*', verticalExaggeration, elevation(0, 1)];
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
    ['match', elevation(), 0, 0, 1],
  ];
}

export function shaded(colorramp, nodata, varMin = 'min', varMax = 'max') {
  return [
    'case',
    // value between min/max
    ['between', elevation(), ['var', varMin], ['var', varMax]],
    [
      'palette',
      ['*',
        normalize(elevation(), varMin, varMax),
        colorramp.length
      ],
      colorramp
    ],
    // out of bounds color
    ['color', 0, 0, 0, 0],
  ];
}
