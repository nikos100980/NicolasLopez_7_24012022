import axios from "axios";

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

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
export const uploadPicture = (data, id)=>{
    return (dispatch)=>{
        return axios
        .put (`${process.env.REACT_APP_API_URL}api/auth/profiles/${id}`, data)
        .then((res)=>{
            return axios
            .get(`${process.env.REACT_APP_API_URL}api/auth/profiles/${id}`,data)
            .then((res)=>{
                dispatch({type: UPLOAD_PICTURE, payload: res.data.picture});
            })
            .catch((error)=>console.log(error +"ça marche pas"))
        })
        .catch((error)=> console.log(error));
    }
}