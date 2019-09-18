import { SET_NEW_TOKEN, SET_USER_INFO } from '../actions/actions'

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
      displayName: action.payload.display_name,
      profileImg: action.payload.images[0].url
    }
    // case SET_FAVORITES :
    // /// push into new array
    // return {
    //   ...state
    // }
    // case ADD_FAVORITE :
    // /// push into new array
    // return {
    //   ...state,
    //   favorites: action.payload
    // }
    // case REMOVE_FAVORITE :
    // /// push into new array
    // return {
    //   ...state,
    //   favorites: action.payload
    // }
    default:
      return state;
  }
};

export default userReducer;
