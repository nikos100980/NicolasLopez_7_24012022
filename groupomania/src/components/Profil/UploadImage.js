import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImage = () => {
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.firstname);
    data.append("userId", userData.id);
    data.append("image", picture);

    dispatch(uploadPicture(data, userData.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg ,.png, .webpp"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" className="button-submit" />
    </form>
  );
};

export default UploadImage;
