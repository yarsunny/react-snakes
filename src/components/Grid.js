import React from 'react';
import {
  Layer,
  Rect,
  Group,
  Text
} from 'react-konva';

export default class Grid extends React.Component {

  render () {
    const { layout, box: { width: boxWidth, height: boxHeight } } = this.props.grid;

    return (
      <Layer>
        {
          Object.keys(layout).map((box) => {
            return (
              <Group key = {`box_${box}`}>
                <Rect
                  x = {layout[box].x - (boxWidth / 2)} y = {layout[box].y - (boxHeight / 2)}
                  width = {boxWidth} height = {boxHeight}
                  fill = {'#ffffff'}
                  strokeWidth = "1" stroke = "#eee"
                />
                <Text
                  x = {layout[box].x - (boxWidth / 2)} y = {layout[box].y - (boxHeight / 2)}
                  fill = {'#678767'} text = {box} padding = {4}
                  fontSize = {8} fontFamily = {'Calibri'} />
              </Group>
            )
          })
        }
      </Layer>
    );
  }
}
