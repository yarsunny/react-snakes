export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const MOVE_PLAYER = 'MOVE_PLAYER';
export const CHANGE_PLAYER = 'CHANGE_PLAYER';
export const CHANGE_PLAYER_POSITION_IN_BOX = 'CHANGE_PLAYER_POSITION_IN_BOX';
export const RECORD_DICE_LOG = 'RECORD_DICE_LOG';
export const LOG_MESSAGE = 'LOG_MESSAGE';
export const SET_PLAYER_PERSISTENCE = 'SET_PLAYER_PERSISTENCE';
export const ENABLE_DICE = 'ENABLE_DICE';

export function addNewPlayer () {
  return {
    type: ADD_NEW_PLAYER
  };
}

export function getRollDiceResult () {
  const max = 6, min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function movePlayer (newPos) {
  return {
    type: MOVE_PLAYER,
    newPos
  }
}

export function changePlayer () {
  return (
    (dispatch) => {
      setTimeout(() => {
        dispatch({type: CHANGE_PLAYER});
      }, 1000);
    }
  )
}

export function changePlayerPositionInBox (playerId, newBoxPosition) {
  return {
    type: CHANGE_PLAYER_POSITION_IN_BOX,
    playerId,
    newBoxPosition
  }
}

export function recordDiceLog (diceResult) {
  return {
    type: RECORD_DICE_LOG,
    recordDiceLog
  }
}

export function logMessage (message) {
  return {
    type: LOG_MESSAGE,
    message
  }
}

export function setPlayerPersistence (persistence) {
  return {
    type: SET_PLAYER_PERSISTENCE,
    persistence
  }
}

export function enableDice () {
  return {
    type: ENABLE_DICE
  }
}
