import axios from "axios";
export const ADD_MESSAGES = "ADD_MESSAGES";
export const UPDATE_MESSAGES = "UPDATE_MESSAGES";
export const DELETE_MESSAGES = "DELETE_MESSAGES";
export const GET_MESSAGES = "GET_MESSAGES";

export const getMessages = (num) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/messages`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_MESSAGES, payload: res.data });
        console.log(res);
      })

      .catch((error) => console.log(error));
  };
};

export const addMessages = (data, userId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/messages/new`,
      withCredentials: true,

      data,
    })
      .then((res) => {
        dispatch({ type: ADD_MESSAGES, payload: res.data, userId });
      })

      .catch((err) => console.log(err));
  };
};

export const updateMessages = (messageId, content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/messages/` + messageId,
      withCredentials: true,
      data: { content },
    })
      .then(() => {
        dispatch({ type: UPDATE_MESSAGES, payload: { content, messageId } });
      })

      .catch((err) => console.log(err));
  };
};

export const deleteMessage = (messageId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/messages/` + messageId,
      withCredentials: true,
    })
      .then(() => {
        dispatch({ type: DELETE_MESSAGES, payload: { messageId } });
      })

      .catch((err) => console.log(err));
  };
};
