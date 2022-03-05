import { GET_MESSAGES } from "../actions/messages.actions";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    default:
      return state;
  }
}
