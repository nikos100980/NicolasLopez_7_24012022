import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const MODIFY_BIO = "MODIFY_BIO";
export const DELETE_PROFIL = "DELETE_PROFIL";

export const getUser = (id, data) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/profiles/${id}`, data)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/auth/profiles/${id}`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/auth/profiles/${id}`, data)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          })
          .catch((error) => console.log(error + "ça marche pas"));
      })
      .catch((error) => console.log(error));
  };
};

export const modifyBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/auth/profiles/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: MODIFY_BIO, payload: bio });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteProfil = (userId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/auth/profiles/` + userId,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: DELETE_PROFIL, payload: { userId } });
        
      })
      .catch((err) => console.log(err));
  };
};
