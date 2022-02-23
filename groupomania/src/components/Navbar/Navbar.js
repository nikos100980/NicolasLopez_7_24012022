import React, { useState, useEffect, useContext } from "react";
import Menu from "../assets/icons/fi-br-menu-burger.svg";
import Logo from "../assets/icons/icon-left-font-monochrome-white.png";
import RegisterForm from "../Modal/RegisterForm";
import LoginForm from "../Modal/LoginForm";
import useModal from "../Modal/Usemodal";
import Modal from "../Modal/Modal";
import { NavLink } from "react-router-dom";
import { UidContext } from "../AppContext";

const Navbar = () => {
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm,
  } = useModal();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const uid = useContext(UidContext);

  return (
    <nav>
      <NavLink to="/">
        <div className="logo">
          <img src={Logo} alt="logo groupomania" />
        </div>
      </NavLink>

      <ul>
        <li></li>
        <li className="hello">
          <NavLink to="/profil">
            <h5>Bienvenue trucmuche</h5>
          </NavLink>
        </li>
        Logo logout
      </ul>

      {(toggleMenu || width > 500) && (
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
      <button onClick={toggleNav} className="btn">
        <img src={Menu} alt="logo-menu" />
      </button>
      
    </nav>
  );
};

export default Navbar;
