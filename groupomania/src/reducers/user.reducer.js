import {
  GET_USER,
  MODIFY_BIO,
  UPLOAD_PICTURE,
  DELETE_PROFIL,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case MODIFY_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case DELETE_PROFIL:
      return action.payload.userId;
    default:
      return state;
  }
}
