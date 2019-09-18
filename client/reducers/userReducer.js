import { SET_NEW_TOKEN, SET_USER_INFO, UPDATE_FAVORITES } from '../actions/actions'

const initialState = {
  token: null,
  displayName: '',
  profileImg: '',
  favorites: []
};

const userReducer = (state=initialState, action) => {

  switch(action.type) {
    case SET_NEW_TOKEN :
    return {
      ...state,
      token: action.payload
    }
    case SET_USER_INFO :
    return {
      ...state,
      displayName: action.payload.user.display_name,
      profileImg: action.payload.user.images[0].url,
      favorites: action.payload.favorites,
    }
    case UPDATE_FAVORITES :
    return {
      ...state,
      favorites: action.payload,
    }
    default:
      return state;
  }
};

export default userReducer;
