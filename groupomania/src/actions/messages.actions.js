import axios from "axios";
export const ADD_MESSAGES = "ADD_MESSAGES";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export const DELETE_MESSAGES = "DELETE_MESSAGES";
export const GET_MESSAGES = "GET_MESSAGES";
export const POST_LIKES = "POST_LIKES";
export const POST_UNLIKES = "POST_UNLIKES";

export const getMessages = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/messages`,
        withCredentials: true,
      });
      dispatch({ type: GET_MESSAGES, payload: res.data });
    } catch (error) {
      return console.log(error);
    }
  };
};

export const addMessages = (data, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/messages/new`,
        withCredentials: true,

        data,
      });
      dispatch({ type: ADD_MESSAGES, payload: res.data, userId });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const updateMessages = (messageId, content) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/messages/` + messageId,
        withCredentials: true,
        data: { content },
      });
      dispatch({ type: UPDATE_MESSAGES, payload: { content, messageId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteMessage = (messageId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/messages/`+ messageId,
        withCredentials: true,
      });
      dispatch({ type: DELETE_MESSAGES, payload: { messageId } });
    } catch (err) {
      return console.log(err);
    }
  };
};
export const likeMessages = (messageId, userId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/messages/${messageId}/likes`,
        data: { id: userId },
        withCredentials: true,
      });
      dispatch({ type: POST_LIKES, payload: { messageId, userId } });
    } catch (error) {
      return console.log(error);
    }
  };
};

export const unLikeMessages = (messageId, userId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/messages/${messageId}/dislikes`,
        data: { id: userId },
        withCredentials: true,
      });
      dispatch({ type: POST_UNLIKES, payload: { messageId, userId } });
    } catch (error) {
      return console.log(error);
    }
  };
};
