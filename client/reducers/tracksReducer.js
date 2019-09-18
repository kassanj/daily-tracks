import { SET_TRACK_LIST, SET_CURRENT_TRACK, UPDATE_PLAY_STATUS } from '../actions/actions'

const initialState = {
  tracks: [],
  currentSong: '',
  currentArtist: '',
  currentAlbum: '',
  currentCoverArt: '',
  currentTrackUri: '',
  isPlaying: false,
};

const tracksReducer = (state=initialState, action) => {

  switch(action.type) {
    case SET_TRACK_LIST :
    return {
      ...state,
      tracks: action.payload
    }
    case SET_CURRENT_TRACK :
    return {
      ...state,
      currentSong: action.payload.name,
      currentArtist: action.payload.artists[0].name,
      currentAlbum: action.payload.album.name,
      currentCoverArt: action.payload.album.images[0].url,
      currentTrackUri: action.payload.uri,
      isPlaying: true,
    }
    case UPDATE_PLAY_STATUS :
    return {
      ...state,
      isPlaying: action.payload
    }
    default:
      return state;
  }
};

export default tracksReducer;
