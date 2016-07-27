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
  CHANGE_PLAYER
} from '../actions/GameActions';

const initialState = {
  dice: {
    disabled: false
  },
  grid: {
    layout: _constructGrid(),
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
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
      diceLog: []
    },
    all: [
      {
        id: 1,
        pos: 1,
        color: '#675652',
        path: [1],
        diceLog: []
      }
    ]
  }
}

export function game (state = initialState, action) {

  switch (action.type) {
    case ADD_NEW_PLAYER:
      return {
          ...state,
          players: {
            ...state.players,
            all: [ ...state.players.all ,_newPlayer(state.players.count)],
            count: state.players.count + 1,
          }
      };

    case MOVE_PLAYER:
      const newPos = state.players.current.pos + action.diceResult
      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: true
        },
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              p.pos = newPos
            }
            return p;
          }),
          current: {
            ...state.players.current,
            pos: newPos,
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

function _newPlayer (curCount) {
  return {
    id: curCount + 1,
    color: getRandomColor(),
    pos: 1,
    path: [1],
    diceLog: []
  }
}

function _getNextPlayer ({all, current, count}) {
  return current.id === count ? all[0] : all.filter((p) => p.id === current.id + 1 )[0];
}
