import React from 'react';
import { Motion, spring } from 'react-motion';
import {
  Circle,
  Layer
} from 'react-konva';
import { getPlayerCoordinates } from '../config/utils';

export default class CanvasPlayer extends React.Component {

  render () {
    const { layout, player: { color, id, pos, boxPosition }, current: { id: currentPlayerId } } = this.props;
    const { x, y } = getPlayerCoordinates(layout, pos, boxPosition);

    const isCurrent = !!(id === currentPlayerId);

    return (
      <Layer>
        <Motion style={{x: spring(x), y: spring(y)}}>
          {
            ({x, y}) => (
              <Circle
                x = { x }
                y = { y }
                radius = { 10 }
                fill = {color}
                />
            )
          }
        </Motion>
      </Layer>
    );
  }
}
