import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import CanvasGrid from './Canvas.Grid';
import CanvasPlayer from './Canvas.Player';
import Players from './Players';
import {
  addNewPlayer,
  getRollDiceResult,
  movePlayer,
  changePlayer,
  changePlayerPositionInBox
} from '../actions/GameActions';
import { getPlayerCoordinates } from '../config/utils';

export default class Game extends React.Component {

  constructor (props) {
    super(props);
  }

  _rollDice () {
      const { pos: currentPos, id } = this.props.game.players.current;
      this.props.movePlayer(getRollDiceResult());
      this._resolveOccupancyOverload();
      setTimeout(() => {
        this.props.changePlayer();
      }, 2000);
  }

  _resolveOccupancyOverload () {
    const { grid: { occupancy }, players: { all } } = this.props.game;
    const boxesWithMoreThanOneOccupants = Object.keys(occupancy).filter((box) => occupancy[box]>1);
    for (let box of boxesWithMoreThanOneOccupants) {
      const playersWithinBox = all.filter((player) => player.pos == box);
      let count = 0;
      for (let player of playersWithinBox) {
        this.props.changePlayerPositionInBox(player.id, count++);
      }
    }
  }

  _addNewPlayer () {
    this.props.addNewPlayer();
    setTimeout(() => {
      this._resolveOccupancyOverload();
    }, 400);
  }

  render () {
    const { dice: { disabled: isDiceDisabled }, grid: { width, height, layout }, grid, players: { all, current }, players } = this.props.game;

    return (
      <div>
        <div>
          <button disabled={isDiceDisabled} onClick={this._rollDice.bind(this)}>Roll Dice</button>
          <button onClick={this._addNewPlayer.bind(this)}>Add New Player</button>
          <div>Current Player: {current.id}</div>
          <Players players={players} />
        </div>
        <Stage
          width={width}
          height={height}>
          <CanvasGrid grid={grid} />
          {
            all.map((p, index) => {
              return (
                <CanvasPlayer
                  key={`canvasplayer_${index}`}
                  player={p}
                  current={current}
                  layout={layout}
                  />
              )
            })
          }
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
  movePlayer,
  changePlayer,
  changePlayerPositionInBox
})(Game);
