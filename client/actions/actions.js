require("babel-polyfill");
const axios = require('axios');


export const SET_NEW_TOKEN = 'SET_NEW_TOKEN';
export const SET_TRACK_LIST = 'SET_TRACK_LIST';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const UPDATE_PLAY_STATUS = 'UPDATE_PLAY_STATUS';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';
export const CREATE_APPLICATION_ERROR = 'CREATE_APPLICATION_ERROR';

export const setNewToken = (token) => (dispatch) => {
  dispatch({
    type: SET_NEW_TOKEN,
    payload: token
  })
};

export const setTrackList = (tracks) => (dispatch) => {
  dispatch({
    type: SET_TRACK_LIST,
    payload: tracks
  })
};

export const setUserInfo = (data) => (dispatch) => {
  dispatch({
    type: SET_USER_INFO,
    payload: data
  })
};

export const setCurrentTrack = (data) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TRACK,
    payload: data
  })
};

export const updatePlayStatus = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_PLAY_STATUS,
    payload: data
  })
};

export const updateFavorites = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_FAVORITES,
    payload: data
  })
};

export const addFavorites = (trackId, token, username) => {
  return async (dispatch) => {
    try {
      const favs = await axios.post('/api/favs/add', {
        token: token,
        trackId: trackId,
        username: username,
      })
      dispatch(updateFavorites(favs.data))
    }
    catch(e) {
      console.warn(e.message);
      // dispatch({ type: 'SIGN_UP_ERROR' })
    }
  }
}

export const removeFavorites = (trackId, token, username) => {
  return async (dispatch) => {
    try {
      const favs = await axios.post('/api/favs/remove', {
        token: token,
        trackId: trackId,
        username: username,
      })
      dispatch(updateFavorites(favs.data))
    }
    catch(e) {
      console.warn(e.message);
      // dispatch({ type: 'SIGN_UP_ERROR' })
    }
  }
}
