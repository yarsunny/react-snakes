import React from 'react';
import { Layer, Line } from 'react-konva';
import { getPlayerCoordinates } from '../config/utils';

export default class CanvasSnake extends React.Component {
  render () {
    const { snake: { startPos, endPos } } = this.props;
    const { x: startX, y: startY } = getPlayerCoordinates(startPos);
    const { x: endX, y: endY } = getPlayerCoordinates(endPos);

    return (
      <Layer>
        <Line
          points={[startX, startY, endX, endY]}
          stroke={'#ffa09c'}
          lineCap="round"
          strokeWidth={4}
          dash={[1, 5]}
          />
      </Layer>
    )
  }
}
