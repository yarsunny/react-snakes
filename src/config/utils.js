export function getRandomColor () {
  return ('#'+Math.random().toString(16).substr(-6));
};

export function getPlayerCoordinates (layout , pos) {
  return {
    x: layout[pos].x,
    y: layout[pos].y
  };
}
