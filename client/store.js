/**
 * ************************************
 *
 * @module  store.js
 * @author
 * @date
 * @description Redux 'single source of truth'
 *
 * ************************************
 */

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools()
);

store.subscribe(() => {
  saveState({
    trackList: store.getState().trackList,
    user: store.getState().user
  });
});

export default store;
