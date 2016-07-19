import React from 'react';
import {
  Layer,
  Rect,
  Stage,
  Group,
  Text
} from 'react-konva';
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  BOX_WIDTH,
  BOX_HEIGHT
} from '../config/variables';
import Player from './Player';
import randomcolor from 'randomcolor';

export default class Grid extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      player: {
        x: BOX_WIDTH / 2,
        y: GRID_HEIGHT - (BOX_HEIGHT / 2),
        pos: 1
      },
      GRID: this.constructGrid()
    }
  }

  constructGrid () {

    let oddRows = [1, 3, 5, 7, 9];
    let evenRows = [0, 2, 4, 6, 8];

    let grid = {};
    let counter =  5

    for (let col = 1;  col <= 10 ; col++) {
      //even rows
      evenRows.map((row) => {
        grid[col + 10 * row] = {
          x: (col-1) * BOX_WIDTH + BOX_WIDTH / 2,
          y: GRID_HEIGHT - (row * BOX_HEIGHT + BOX_HEIGHT / 2),
          id: col + 10 * row
        }
      });

      //odd rows
      oddRows.map((row) => {
        grid[col + 10 * row] = {
          x: GRID_WIDTH - ((col - 1)  * BOX_WIDTH + BOX_WIDTH / 2),
          y: GRID_HEIGHT - (row * BOX_HEIGHT + BOX_HEIGHT / 2),
          id: col + 10 * row
        }
      });
    }
    return grid;
  }

  movePlayer () {
      let curDice = this.rollDice();
      let curPos = this.state.player.pos;
      const newPos = curPos + curDice;
      const grid = this.state.GRID;

      const curY = grid[curPos].y;
      const newY = grid[newPos].y;

      var edges = [[10, 11], [20, 21], [30, 31], [40, 41], [50, 51], [60, 61], [70, 71], [80, 81], [90, 91]];

      if ( curY !== newY ) {
        var bend = edges.filter((edge) => {
          return curPos <= edge[0] && newPos >= edge[1];
        })[0];

        this.setState({...this.state, player: { x: grid[bend[0]].x, y: grid[bend[0]].y, pos: bend[0]}});
        setTimeout(() => {
            this.setState({...this.state, player: { x: grid[bend[1]].x, y: grid[bend[1]].y, pos: bend[1]}});
            setTimeout(() => {
              this.setState({...this.state, player: { x: grid[newPos].x, y: grid[newPos].y, pos: newPos}});
            }, 300);
        }, 300);
      } else {
        this.setState({
          ...this.state,
          player: {
            x: grid[newPos].x,
            y: grid[newPos].y,
            pos: newPos
          }
        })
      }
  }

  rollDice () {
    const max = 6, min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  render () {
    let GRID = this.state.GRID;
    return (
      <div>
        <div>
          <button onClick={this.movePlayer.bind(this)}>genreate a dice</button>
        </div>
        <Stage
          width={GRID_WIDTH}
          height={GRID_HEIGHT}>
          <Layer>
            {
              Object.keys(GRID).map((box) => {
                return (
                  <Group key = {`box_${box}`}>
                    <Rect
                      x = {GRID[box].x - (BOX_WIDTH / 2)} y = {GRID[box].y - (BOX_HEIGHT / 2)}
                      width = {BOX_WIDTH} height = {BOX_HEIGHT}
                      fill = {'#ffffff'}
                      strokeWidth = "1" stroke = "#eee"
                    />
                    <Text
                      x = {GRID[box].x - (BOX_WIDTH / 2)} y = {GRID[box].y - (BOX_HEIGHT / 2)}
                      fill = {'#678767'} text = {box} padding = {4}
                      fontSize = {8} fontFamily = {'Calibri'} />
                  </Group>
                )
              })
            }
          </Layer>
          <Layer>
            <Player x={this.state.player.x} y={this.state.player.y}></Player>
          </Layer>
        </Stage>
      </div>
    );
  }
}
