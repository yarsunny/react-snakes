export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';

export function addNewPlayer () {
  return {
    type: ADD_NEW_PLAYER
  };
}

export function getRollDiceResult () {
  const max = 6, min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function movePlayer (diceResult) {
  return {
    type: MOVE_PLAYER,
    diceResult
  }
}

export function changePlayer () {  
    return {
      type: CHANGE_PLAYER
    }
}
