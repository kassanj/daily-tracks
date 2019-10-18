import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    trackList: store.getState().trackList,
    user: store.getState().user
  });
});

export default store;
