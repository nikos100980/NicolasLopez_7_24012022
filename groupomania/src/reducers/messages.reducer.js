import {
  ADD_MESSAGES,
  DELETE_MESSAGES,
  GET_MESSAGES,
  POST_LIKES,
  POST_UNLIKES,
  UPDATE_MESSAGES,
} from "../actions/messages.actions";
import {
  ADD_COMMENTS,
  DELETE_COMMENTS,
  GET_COMMENTS,
} from "../actions/comments.actions";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    case ADD_MESSAGES:
      return action.payload;
    case UPDATE_MESSAGES:
      return state.map((message) => {
        if (message.id === action.payload.messageId) {
          return {
            ...message,
            content: action.payload.content,
          };
        } else return message;
      });
    case DELETE_MESSAGES:
      return state.filter((message) => message.id !== action.payload.messageId);
    case POST_LIKES:
      return state.map((message) => {
        if (message.messageId === action.payload.messageId) {
          return {
            ...message,
            Likes: [action.payload.userId, ...message.Likes],
          };
        }
        return message;
      });
    case POST_UNLIKES:
      return state.map((message) => {
        if (message.messageId === action.payload.messageId) {
          return {
            ...message,
            Likes: message.Likes.filter((id) => id !== action.payload.userId),
          };
        }
        return message;
      });
    case GET_COMMENTS:
      return state.map((message) => {
        if (message.id === action.payload.messageId) {
          return {
            ...message,
            comments: action.payload.comments,
          };
        } else return message;
      });

    case ADD_COMMENTS:
      return state.map((message) => {
        if (message.id === action.payload.amessageId) {
          return {
            ...message,
            comments: action.payload.comments,
          };
        } else return message;
      });

    case DELETE_COMMENTS:
      return state.map((message) => {
        if (message.id === action.payload.messageId) {
          return {
            ...message,
            comments: message.comments.filter(
              (comment) => comment.id !== action.payload.commentId
            ),
          };
        } else return message;
      });

    default:
      return state;
  }
}
