import React from 'react';
import { Motion, spring } from 'react-motion';
import {
  Circle,
  Layer
} from 'react-konva';
import { getPlayerCoordinates } from '../config/utils';

export default class CanvasPlayer extends React.Component {

  render () {
    const { player: { color, id, pos, boxPosition }, current: { id: currentPlayerId } } = this.props;
    const { x, y } = getPlayerCoordinates(pos, boxPosition);
    const isCurrent = !!(id === currentPlayerId);

    return (
      <Layer>
        <Motion style={{x: spring(x), y: spring(y)}}>
          {
            ({x, y}) => (
              <Circle
                x={x}
                y={y}
                radius={10}
                fill={color}
                stroke={isCurrent ? '#666666': '#ffffff'}
                strokeWidth={isCurrent ? 2 : 0}
                />
            )
          }
        </Motion>
      </Layer>
    );
  }
}
