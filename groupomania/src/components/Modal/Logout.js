import React from "react";
import cookie from "js-cookie";
import Deco from "../assets/icons/deconnexion-alt.svg";
import axios from "axios";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((error) => {
        console.log(error);
      });
    window.location = "/";
  };

  return (
    <li onClick={logout} className="hello">
      <img src={Deco} alt="logo de deconnexion" />
    </li>
  );
};

export default Logout;
