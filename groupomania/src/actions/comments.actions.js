import axios from "axios";



export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENTS = "ADD_COMMENTS";
export const DELETE_COMMENTS = "DELETE_COMMENTS";

export const getComments = (messageId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url:
        `${process.env.REACT_APP_API_URL}api/messages/` +
        messageId +
        "/comments/",

      withCredentials: true,
    })
      .then((comment) => {
        console.log(comment);
        dispatch({
          type: GET_COMMENTS,
          payload: {messageId, comments: comment.data}
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (messageId, userId, content) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/messages/comments/`+ messageId,
      withCredentials: true,
      data: { userId, content, messageId},
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: ADD_COMMENTS,
          payload: {messageId,userId,content},
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (commentId, messageId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url:
        `${process.env.REACT_APP_API_URL}api/messages/deletecomments/` +
        commentId,

      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENTS, payload: { commentId, messageId } });
      })
      .catch((err) => console.log(err));
  };
};
