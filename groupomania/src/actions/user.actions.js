import axios from "axios";

export const GET_USER = 'GET_USER';

export const getUser = (uid)=>{
    return(dispatch)=>{
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/auth/profiles/${uid}`)
        .then((res)=>{
            dispatch({ type: GET_USER, payload: res.data})
        })
        .catch((error)=> console.log((error)));
    };
};