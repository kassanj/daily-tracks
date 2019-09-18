import { SET_NEW_TOKEN } from '../actions/actions'

const initialState = {
  token: null,
};

const userReducer = (state=initialState, action) => {

  switch(action.type) {
    case SET_NEW_TOKEN :
    return {
      ...state,
      token: action.payload
    }
    default:
      return state;
  }
};

export default userReducer;
