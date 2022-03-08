
import { GET_MESSAGES, POST_LIKES } from "../actions/messages.actions";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
      case POST_LIKES:
        // eslint-disable-next-line array-callback-return
        return state.map((message) => {
          if(message.id === action.payload.messageId){
            return {
              ...message,
              Likes:[action.payload.userId, ...message.Likes],
            };
          }
          return message;
        });
    default:
      return state;
  }
}
