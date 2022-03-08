import axios from 'axios';


export const GET_MESSAGES = "GET_MESSAGES";
export const POST_LIKES = "POST_LIKES";

export const getMessages = () =>{
    return (dispatch)=>{
        return axios
        .get (`${process.env.REACT_APP_API_URL}api/messages/`)
        .then ((res)=>{
            dispatch({ type: GET_MESSAGES, payload: res.data})
        })
        .catch((error)=> console.log(error))
    };
};

export const likeMessage = (messageId, userId)=>{
return (dispatch)=>{
    return axios ({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/messages/${messageId}/likes`,
        data: { id:userId}
    })
    .then((res)=>{
        dispatch({ type:POST_LIKES, payload: res.data })
    })
    .catch((error)=> console.log(error))
}




};