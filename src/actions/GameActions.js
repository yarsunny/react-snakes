export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const CHANGE_PLAYER_POSITION_IN_BOX = 'CHANGE_PLAYER_POSITION_IN_BOX';

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

export function changePlayerPositionInBox (playerId, newBoxPosition) {
  return {
    type: CHANGE_PLAYER_POSITION_IN_BOX,
    playerId,
    newBoxPosition
  }
}
