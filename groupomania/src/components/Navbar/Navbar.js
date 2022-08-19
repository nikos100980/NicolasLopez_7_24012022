import React, { useContext } from "react";

import Logo from "../assets/icons/icon.png";

import RegisterForm from "../Modal/RegisterForm";
import LoginForm from "../Modal/LoginForm";
import useModal from "../Modal/Usemodal";
import Modal from "../Modal/Modal";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";
import { useSelector } from "react-redux";
import Logout from "../Modal/Logout";

const Navbar = () => {
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm,
  } = useModal();

  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/">
          <div className="logo">
            <img src={Logo} alt="logo groupomania" className="groupo-icon" />
            <h3>Groupomania</h3>
          </div>
        </NavLink>

        {uid ? (
          <ul className="liste">
            <li className="hello ">
              <NavLink to="/profil">
                <h5>Bienvenue, {userData.firstName}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul className="liste">
            <li className="modal-toggle items" onClick={toggleRegistrationForm}>
              S'inscrire
            </li>
            <li className="modal-toggle items" onClick={toggleLoginForm}>
              Se connecter
            </li>
            <Modal
              isShowing={isLoginFormShowed}
              hide={toggleLoginForm}
              title="Se connecter"
            >
              <LoginForm />
            </Modal>

            <Modal
              isShowing={isRegistrationFormShowed}
              hide={toggleRegistrationForm}
              title="S'inscrire"
            >
              <RegisterForm />
            </Modal>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
