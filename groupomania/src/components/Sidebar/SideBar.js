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
          <NavLink  className={(navData) => navData.isActive ?"active-sidebar" : ""} to='/'
 > 
            <img src={Acceuil} alt="Acceuil" />
          </NavLink>
          <br />
          <NavLink
            className={(navData) => navData.isActive ?"active-sidebar" : ""} to='/profil'
          >
            <img src={User} alt="profil edition" />
          </NavLink>
          <br />
          <NavLink
            className={(navData) => navData.isActive ?"active-sidebar" : ""} to='/trending'
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
