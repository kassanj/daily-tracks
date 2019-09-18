export const SET_NEW_TOKEN = 'SET_NEW_TOKEN';
export const SET_TRACK_LIST = 'SET_TRACK_LIST';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const UPDATE_PLAY_STATUS = 'UPDATE_PLAY_STATUS';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

export const setNewToken = (token) => ({
  type: SET_NEW_TOKEN,
  payload: token,
});

export const setTrackList = (tracks) => ({
  type: SET_TRACK_LIST,
  payload: tracks,
});

export const setUserInfo = (data) => ({
  type: SET_USER_INFO,
  payload: data,
});

export const setCurrentTrack = (data) => ({
  type: SET_CURRENT_TRACK,
  payload: data,
});

export const updatePlayStatus = (data) => ({
  type: UPDATE_PLAY_STATUS,
  payload: data,
})

export const updateFavorites = (favs) => ({
  type: UPDATE_FAVORITES,
  payload: favs,
})
