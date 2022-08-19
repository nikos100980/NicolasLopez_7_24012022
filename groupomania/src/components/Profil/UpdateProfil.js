import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyBio } from "../../actions/user.actions";
import SideBar from "../Sidebar/SideBar";
import UploadImage from "./UploadImage";
import DeleteProfil from "./DeleteProfil";
import Avatar from "../assets/icons/undefined.png";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [modifyForm, setModifyForm] = useState(false);

  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleModify = () => {
    dispatch(modifyBio(user.id, bio));
    setModifyForm(false);
  };

  return (
    <div className="profil-container">
      <SideBar />
      <h1>Profil de {user.firstName}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {user.picture ? (
            <img src={user.picture} alt="user" key={"userImage" + user.id} />
          ) : (
            <img
              src={Avatar}
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
                <p onClick={() => setModifyForm(!modifyForm)}>{user.bio} </p>
                <button onClick={() => setModifyForm(!modifyForm)}>
                  Modifier
                </button>
              </>
            )}
            {modifyForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={user.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleModify}>
                  Valider vos modifications
                </button>
              </>
            )}
            <br />
            <br />
            <DeleteProfil id={user.id} />
            <br />
            <br />
          </div>
          <h4>Inscrit depuis le {dateParser(user.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
