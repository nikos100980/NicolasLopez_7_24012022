import React, { useState, useEffect } from "react";
import Menu from "../assets/icons/fi-br-menu-burger.svg";
import RegisterForm from "../Modal/RegisterForm";
import LoginForm from "../Modal/LoginForm";
import useModal from "../Modal/Usemodal";
import Modal from "../Modal/Modal";

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

  return (
    <header>
      <nav>
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
    </header>
  );
};

export default Navbar;
