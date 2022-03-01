import React from "react";
import { NavLink } from "react-router-dom";
import Acceuil from "../assets/icons/maison.svg";
import User from "../assets/icons/utilisateur.svg";
import Top from "../assets/icons/statistiques.svg";

const sideBar = () => {
  
  return (
    <div className="sidebar-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink classeName={(navigationData) => navigationData.isActive ? "active-sidebar": null } to="/" 
 >
            <img src={Acceuil} alt="Acceuil" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
             classeName={(isActive) => isActive ? "active-sidebar": null }
          >
            <img src={User} alt="profil edition" />
          </NavLink>
          <br />
          <NavLink
            to="/trending"
            className={(navData) => navData.isActive ? "active-sidebar" : "" }
          >
            <img src={Top} alt="commentaires les plus likés" />
          </NavLink>
          <br />
        </div>
      </div>
    </div>
  );
};

export default sideBar;
