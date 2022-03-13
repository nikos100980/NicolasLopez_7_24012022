import axios from "axios";

export const GET_MESSAGES = "GET_MESSAGES";
export const POST_LIKES = "POST_LIKES";
export const POST_UNLIKES = "POST_UNLIKES";

export const getMessages = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/messages/`)
      .then((res) => {
        dispatch({ type: GET_MESSAGES, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const likeMessages = (messageId, userId) =>{
  return (dispatch) =>{
   return axios ({
     method : 'post',
     url: `${process.env.REACT_APP_API_URL}api/messages/${messageId}/likes`,
     data:{id: userId},
     withCredentials: true,
   })
   .then((res)=>{
     dispatch({ type: POST_LIKES, payload:{messageId, userId}});
   })
   .catch((error)=>console.log(error));
  };
};

export const unLikeMessages = (messageId, userId) =>{
  return (dispatch) =>{
   return axios ({
     method : 'post',
     url: `${process.env.REACT_APP_API_URL}api/messages/${messageId}/likes`,
     data:{id: userId},
     withCredentials: true,
   })
   .then((res)=>{
     dispatch({ type: POST_UNLIKES, payload:{messageId, userId}});
   })
   .catch((error)=>console.log(error));
  };
};

