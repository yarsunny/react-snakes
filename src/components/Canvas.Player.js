import React from 'react';
import { Motion, spring } from 'react-motion';
import { Circle, Layer, Group, Text } from 'react-konva';
import { getPlayerCoordinates } from '../config/utils';
import { styles } from '../styles';

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
              <Group>
                <Circle
                  x={x}
                  y={y}
                  radius={12}
                  fill={isCurrent ? styles.white :color }
                  stroke={color}
                  strokeWidth={2}
                  />
                <Text
                  x = {x-4} y = {y-7}
                  fill = {isCurrent ? color : styles.white} text = {id}
                  fontSize = {15} fontFamily = {'arial'} />
              </Group>
            )
          }
        </Motion>
      </Layer>
    );
  }
}
