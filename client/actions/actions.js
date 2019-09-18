export const SET_NEW_TOKEN = 'SET_NEW_TOKEN';
export const SET_TRACK_LIST = 'SET_TRACK_LIST';

export const setNewToken = (token) => ({
  type: SET_NEW_TOKEN,
  payload: token,
});

export const setTrackList = (tracks) => ({
  type: SET_TRACK_LIST,
  payload: tracks,
});
