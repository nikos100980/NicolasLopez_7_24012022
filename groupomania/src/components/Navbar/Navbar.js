import React, { useState, useEffect } from "react";
import Menu from "../assets/icons/fi-br-menu-burger.svg";

const Navbar = () => {
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
            <li className="items">S'inscrire</li>
            <li className="items">Se connecter</li>
          </ul>
        )}
        <button onClick={toggleNav} className="btn">
          <img src={Menu} alt="" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
