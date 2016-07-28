import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import CanvasGrid from './Canvas.Grid';
import CanvasPlayer from './Canvas.Player';
import CanvasSnake from './Canvas.Snake';
import CanvasLadder from './Canvas.Ladder';
import Players from './Players';
import Results from './Results';
import {
  addNewPlayer, getRollDiceResult, movePlayer, changePlayer,
  changePlayerPositionInBox, recordDiceLog, logMessage,
  enableDice, setPlayerPersistence, endGame,
  addSnakeBite, addLadderHike
} from '../actions/GameActions';
import { GAME_ON, MAX_PLAYERS } from '../config/variables';
import { gameStyles } from '../styles/style.game';

export default class Game extends React.Component {

  constructor (props) {
    super(props);
  }

  _rollDice () {
    const { players: { current: { id, pos }, persistence } } = this.props.game;
    const diceResult = getRollDiceResult();
    const newPos = pos + diceResult;

    this.props.recordDiceLog(diceResult);
    if (newPos > 100) {
      this.props.logMessage(`Hang in there Player ${id}`);
      this.props.changePlayer();
    } else if (newPos == 100) {
      this.props.movePlayer(newPos);
      this.props.endGame();
    } else {
      this.props.movePlayer(newPos);
      this.props.logMessage(`Player ${id} moved to block ${newPos}`);

      this._checkSnakeBiteorLadderJump(newPos);
      this._resolveOccupancyOverload();

      if (diceResult === 6 && persistence < 3) {
        this.props.logMessage(`SIX SIX SIX ${persistence}`);
        this.props.enableDice();
        this.props.setPlayerPersistence(persistence + 1);
      } else {
        this.props.changePlayer();
        this.props.setPlayerPersistence(1);
      }
    }
  }

  _checkSnakeBiteorLadderJump (playerPos) {
    const { snakes, ladders, players: { current: { id } } } = this.props.game;
    const cops = snakes.map((s) => s.startPos);
    const redbull = ladders.map((l) => l.startPos);

    if (cops.indexOf(playerPos) !== -1) {
      /* busted */
      const snake = snakes.filter((s) => (s.startPos === playerPos))[0];
      this.props.movePlayer(snake.endPos);
      this.props.addSnakeBite();
      this.props.logMessage(`Player ${id} got BUSTED, moved to block ${snake.endPos}`);
    }

    if (redbull.indexOf(playerPos) !== -1) {
      /* got wings */
      const ladder = ladders.filter((l) => (l.startPos === playerPos))[0];
      this.props.movePlayer(ladder.endPos);
      this.props.addLadderHike();
      this.props.logMessage(`Player ${id} found a redbull, moved to block ${ladder.endPos}`);
    }

  }

  _resolveOccupancyOverload () {
    setTimeout(() => {
      const { grid: { occupancy }, players: { all } } = this.props.game;
      const boxesWithMoreThanOneOccupants = Object.keys(occupancy).filter((box) => occupancy[box]>1);
      for (let box of boxesWithMoreThanOneOccupants) {
        const playersWithinBox = all.filter((player) => player.pos == box);
        let count = 0;
        for (let player of playersWithinBox) {
            this.props.changePlayerPositionInBox(player.id, count++);
        }
      }
    }, 400)
  }

  _addNewPlayer () {
    this.props.addNewPlayer();
    this._resolveOccupancyOverload();
  }

  render () {
    const {
      status,
      dice: { disabled: isDiceDisabled },
      grid: { width, height, layout }, grid,
      players: { all, current, count: playerCount }, players,
      snakes, ladders, messages
    } = this.props.game;

    return (
      <div style={gameStyles.main}>
        {
          status === GAME_ON
          ?
          <div>
            <div style={gameStyles.gameBlock}>
              <Stage
                width={width}
                height={height}>
                <CanvasGrid grid={grid} />
                { /* players */
                  all.map((p, index) => {
                    return (
                      <CanvasPlayer
                        key={`canvasPlayer_${index}`}
                        player={p}
                        current={current}
                        />
                    )
                  })
                }
                { /* snakes */
                  snakes.map((s, index) => {
                    return (
                      <CanvasSnake
                        key={`canvasSnake_${index}`}
                        snake={s}
                        />
                    )
                  })
                }
                { /* ladders */
                  ladders.map((l, index) => {
                    return (
                      <CanvasLadder
                        key={`canvasLadder_${index}`}
                        ladder={l}
                        />
                    )
                  })
                }
              </Stage>
            </div>
            <div style={gameStyles.dataBlock}>
              <button disabled={isDiceDisabled} onClick={this._rollDice.bind(this)} style={gameStyles.cta}>Roll Dice</button>
              <button onClick={() => {this.props.endGame()}} style={gameStyles.cta}>End Game</button>
              {
                playerCount < MAX_PLAYERS
                ?
                <button onClick={this._addNewPlayer.bind(this)}>Add New Player</button>
                : null
              }
              <div>Current Player: {current.id}</div>
              <Players players={players} />
              <div style={gameStyles.commentry}>
              {
                messages.map((message, index) => <div key={`message_${index}`}>{message}</div>)
              }
              </div>
            </div>
          </div>
          :
          <Results players={all} />

        }
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
  changePlayerPositionInBox,
  recordDiceLog,
  logMessage,
  enableDice,
  setPlayerPersistence,
  endGame,
  addSnakeBite,
  addLadderHike
})(Game);
