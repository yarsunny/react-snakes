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
  MOVE_PLAYER
} from '../actions/GameActions';

const initialState = {
  grid: {
    layout: constructGrid(),
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
      color: '#675652'
    },
    all: [
      {
        id: 1,
        pos: 1,
        color: '#675652'
      }
    ]
  }
}

export function game (state = initialState, action) {
  debugger;
  switch (action.type) {
    case ADD_NEW_PLAYER:
      return {
          ...state,
          players: {
            ...state.players,
            all: state.players.all.push(newPlayer(state.players.count)),
            count: state.players.count + 1,
          }
      };

    case MOVE_PLAYER:
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map((p) => {
            if (p.id === state.players.current.id) {
              p.pos = p.pos + action.diceResult
            }
            return p;
          }),
          current: {
            ...state.players.current,
            pos: state.players.current.pos + action.diceResult
          }
        }
      };

    default:
      return state;
  }
}

/*
 * Private functions
 */
function constructGrid () {
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

function newPlayer (curCount) {
  return {
    id: curCount + 1,
    color: getRandomColor(),
    pos: 1
  }
}
