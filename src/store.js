import {
  applyMiddleware,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer'
const logger = createLogger();
export default createStore(rootReducer, applyMiddleware(thunk, logger));
