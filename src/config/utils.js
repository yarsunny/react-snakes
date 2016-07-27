import {
  BOX_WIDTH,
  BOX_HEIGHT
} from './variables';

export function getRandomColor () {
  return ('#'+Math.random().toString(16).substr(-6));
};

export function getPlayerCoordinates (layout , pos, boxPosition) {
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
