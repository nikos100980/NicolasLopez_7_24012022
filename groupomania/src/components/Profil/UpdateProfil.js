import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyBio } from "../../actions/user.actions";
import SideBar from "../Sidebar/SideBar";
import UploadImage from "./UploadImage";
import DayJS from 'react-dayjs'; 

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [modifyForm, setModifyForm] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleModify = () => {
    dispatch(modifyBio(userData.id, bio));
    setModifyForm(false);
  };

  return (
    <div className="profil-container">
      <SideBar />
      <h1>Profil de {userData.firstname}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {userData.picture ? (
            <img
              src={userData.picture}
              alt="user"
              key={"userImage" + userData.id}
            />
          ) : (
            <img
              src={"http://localhost:8080/images/undefined.jpeg"}
              alt="user"
            />
          )}
          <UploadImage />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>A propos de vous</h3>
            {modifyForm === false && (
              <>
                <p onClick={() => setModifyForm(!modifyForm)}>
                  {userData.bio}{" "}
                </p>
                <button onClick={() => setModifyForm(!modifyForm)}>
                  Modifier
                </button>
              </>
            )}
            {modifyForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleModify}>
                  Valider vos modifications
                </button>
              </>
            )}
          </div>
          <h4>Inscrit depuis le : <DayJS format='DD-MMMM-YYYY'  >{userData.createdAt}</DayJS></h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
