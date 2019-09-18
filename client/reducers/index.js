import { combineReducers } from 'redux';

// import all reducers here
import tracksReducer from './tracksReducer';
import userReducer from './userReducer';

// combine reducers
const reducers = combineReducers({
  trackList: tracksReducer,
  user: userReducer,
});

// make the combined reducers available for import
export default reducers;
