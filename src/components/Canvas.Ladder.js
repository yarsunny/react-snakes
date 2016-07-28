import React from 'react';
import { Layer, Line } from 'react-konva';
import { getPlayerCoordinates } from '../config/utils';

export default class CanvasLadder extends React.Component {
  render () {
    const { ladder: { startPos, endPos } } = this.props;
    const { x: startX, y: startY } = getPlayerCoordinates(startPos);
    const { x: endX, y: endY } = getPlayerCoordinates(endPos);

    return (
      <Layer>
        <Line
          points={[startX, startY, endX, endY]}
          stroke={'#96ceb4'}
          lineCap="round"
          strokeWidth={2}
          dash={[20, 5]}
          />
        <Line
          points={[startX - 5, startY, endX - 5, endY]}
          stroke={'#96ceb4'}
          lineCap="round"
          strokeWidth={2}
          dash={[20, 5]}
          />
      </Layer>
    )
  }
}
