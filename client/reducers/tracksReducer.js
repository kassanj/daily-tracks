import { SET_TRACK_LIST } from '../actions/actions'

const initialState = {
  tracks: [],
};

const tracksReducer = (state=initialState, action) => {

  switch(action.type) {
    case SET_TRACK_LIST :
    return {
      ...state,
      tracks: action.payload
    }
    default:
      return state;
  }
};

export default tracksReducer;
