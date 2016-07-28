import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT
} from './variables';

let colorIndex = 0;
export function getRandomColor () {
  const colorPalette = ['#007ae1', '#ff2d55', '#4cd964', '#ff9500'];
  return colorPalette[(colorIndex++) % 4];
};

export function getLayout () {
  let layout = {};
  const oddRows = [1, 3, 5, 7, 9],
        evenRows = [0, 2, 4, 6, 8];

  for (let col = 1;  col <= 10 ; col++) {
    //even rows
    evenRows.map((row) => {
      layout[col + 10 * row] = {
        x: (col-1) * BOX_WIDTH + BOX_WIDTH / 2,
        y: GRID_HEIGHT - (row * BOX_HEIGHT + BOX_HEIGHT / 2),
        id: col + 10 * row
      }
    });

    //odd rows
    oddRows.map((row) => {
      layout[col + 10 * row] = {
        x: GRID_WIDTH - ((col - 1)  * BOX_WIDTH + BOX_WIDTH / 2),
        y: GRID_HEIGHT - (row * BOX_HEIGHT + BOX_HEIGHT / 2),
        id: col + 10 * row
      }
    });
  }
  return layout;
}

export function getPlayerCoordinates (pos, boxPosition) {
  const layout = getLayout();
  const x = layout[pos].x;
  const y = layout[pos].y;

  switch (boxPosition) {
    case 0: //top left
      return {
        x: x - BOX_WIDTH / 4,
        y: y - BOX_HEIGHT / 4
      };

    case 1: //top right
      return {
        x: x + BOX_WIDTH / 4,
        y: y - BOX_HEIGHT / 4
      };

    case 2: //bottom left
      return {
        x: x - BOX_WIDTH / 4,
        y: y + BOX_HEIGHT / 4
      };

    case 3: //bottom right
      return {
        x: x + BOX_WIDTH / 4,
        y: y + BOX_HEIGHT / 4
      };

    default:
      return {
        x: x,
        y: y
      };
  }
}
