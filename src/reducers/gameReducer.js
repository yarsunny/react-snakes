import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT
} from '../config/variables';
import {
  getRandomColor
} from '../config/utils';
import {
  ADD_NEW_PLAYER,
  MOVE_PLAYER,
  CHANGE_PLAYER,
  CHANGE_PLAYER_POSITION_IN_BOX
} from '../actions/GameActions';

const initialState = {
  dice: {
    disabled: false
  },
  grid: {
    layout: _constructGrid(),
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    occupancy: _initializeOccupancy(),
    box: {
      height: BOX_HEIGHT,
      width: BOX_WIDTH
    }
  },
  players: {
    count: 1,
    current: {
      id: 1,
      pos: 1,
      color: '#675652',
      path: [1],
      diceLog: [],
      boxPosition: -1 //center
    },
    all: [
      {
        id: 1,
        pos: 1,
        color: '#675652',
        path: [1],
        diceLog: [],
        boxPosition: -1 //center
      }
    ]
  }
}

export function game (state = initialState, action) {

  switch (action.type) {
    case ADD_NEW_PLAYER:
      const newPlayer = _generateNewPlayer(state.players.count);

      return {
          ...state,
          grid: {
            ...state.grid,
            occupancy: {
              ...state.grid.occupancy,
              1: state.grid.occupancy[1] + 1
            }
          },
          players: {
            ...state.players,
            all: [ ...state.players.all ,newPlayer],
            count: state.players.count + 1,
          }
      };

    case MOVE_PLAYER:
      const newPos = state.players.current.pos + action.diceResult;
      let newOccupancy = {};
      newOccupancy[newPos] = state.grid.occupancy[newPos];
      newOccupancy[state.players.current.pos] = state.grid.occupancy[state.players.current.pos] - 1;

      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: true
        },
        grid: {
          ...state.grid,
          occupancy: {
            ...state.grid.occupancy,
            ...newOccupancy
          }
        },
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              p.pos = newPos;
              p.boxPosition = -1;
            }
            return p;
          }),
          current: {
            ...state.players.current,
            pos: newPos,
            boxPosition: -1,
            path: [...state.players.current.path, newPos],
            diceLog: [...state.players.current.diceLog, action.diceResult]
          }
        }
      };

    case CHANGE_PLAYER:
      var nextPlayer = _getNextPlayer(state.players)
      return {
        ...state,
        dice: {
          disabled: false
        },
        players: {
          ...state.players,
          current: nextPlayer
        }
      }

    case CHANGE_PLAYER_POSITION_IN_BOX:
      let curPlayer = state.players.current.id === action.playerId
                      ?
                      { ...state.players.current, boxPosition: action.newBoxPosition }
                      : state.players.current
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === action.playerId) {
              p.boxPosition = action.newBoxPosition;
            }
            return p;
          }),
          current: curPlayer
        }
      }

    default:
      return state;
  }
}

/*
 * Private functions
 */
function _constructGrid () {
  let grid = {};
  const oddRows = [1, 3, 5, 7, 9],
        evenRows = [0, 2, 4, 6, 8];

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

function _generateNewPlayer (curCount) {
  return {
    id: curCount + 1,
    color: getRandomColor(),
    pos: 1,
    path: [1],
    diceLog: [],
    boxPosition: -1 //center
  }
}

function _getNextPlayer ({all, current, count}) {
  return current.id === count ? all[0] : all.filter((p) => p.id === current.id + 1 )[0];
}

function _initializeOccupancy () {
  var occupacy = {};
  occupacy[1] = 1;
  for (let i=2; i<=100; i++) {
    occupacy[i] = 0;
  }
  return occupacy;
}
