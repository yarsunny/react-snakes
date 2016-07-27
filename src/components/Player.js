import React from 'react';
import {
  Circle,
  Layer
} from 'react-konva';
import {
  BOX_HEIGHT,
  BOX_WIDTH,
  GRID_HEIGHT,
  GRID_WIDTH
} from '../config/variables';
import {Motion, spring} from 'react-motion';

export default class Player extends React.Component {
  render () {
    const { current: {pos, id, color}, coordinates: { x, y} } = this.props;
    
    return (
      <Layer>
        <Motion style={{x: spring(x), y: spring(y)}}>
          {
            ({x, y}) =>
              <Circle
                x = { x }
                y = { y }
                radius = {10}
                fill = {color}
                />
          }
        </Motion>
      </Layer>
    );
  }
}
