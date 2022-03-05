import axios from 'axios';


export const GET_MESSAGES = "GET_MESSAGES";

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