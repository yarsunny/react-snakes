import React from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';

import {
  Layer,
  Rect,
  Stage,
  Group,
  Text
} from 'react-konva';
import Player from './Player';
import {
  addNewPlayer,
  getRollDiceResult,
  movePlayer
} from '../actions/GameActions';


export default class Game extends React.Component {

  constructor (props) {
    super(props);
  }

  _rollDice () {
      const { pos: currentPos, id } = this.props.game.players.current;
      this.props.movePlayer(getRollDiceResult());
  }

  _getPlayerCoordinates () {
    const { grid: { layout }, players: { current: { pos } } } = this.props.game;
    return {
      x: layout[pos].x,
      y: layout[pos].y
    };
  }

  render () {
    const { grid: { width, height}, grid, players: { all, current } } = this.props.game;
    const currentPlayerCoordinates = this._getPlayerCoordinates();

    return (
      <div>
        <h1>this is a game</h1>
        <div>
          <button onClick={this._rollDice.bind(this)}>Roll Dice</button>
        </div>
        <Stage
          width={width}
          height={height}>
          <Grid grid={grid}>
          </Grid>
          <Player current={current} coordinates={currentPlayerCoordinates}></Player>
        </Stage>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { game } = state;
  return {
    game
  };
}

export default connect(mapStateToProps, {
  addNewPlayer,
  movePlayer
})(Game);
