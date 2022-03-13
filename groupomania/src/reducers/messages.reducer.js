
import { GET_MESSAGES, POST_LIKES, POST_UNLIKES } from "../actions/messages.actions";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
      case POST_LIKES:
        return state.map((message)=>{
          if(message.id === action.payload.messageId){
            return {
              ...message,
              Likes: [ action.payload.userId, ...message.Likes],
            };
          }
          return message;
        });
        case POST_UNLIKES:
          return state.map((message)=>{
            if(message.id === action.payload.messageId){
              return {
                ...message,
                Likes: message.Likes.filter((id)=> id !== action.payload.userId),
              };
            }
            return message;
          });
    default:
      return state;
  }
}
