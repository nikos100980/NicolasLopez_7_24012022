import React, { useContext } from "react";
import SideBar from "../components/Sidebar/SideBar";
import FilActu from "../components/FilActu";
import { UidContext } from "../components/AppContext";
import NewMessage from "../components/Message/NewMessage";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <div className="home">
          <SideBar />
          <div className="main">
            <div className="home-header">
              <NewMessage />
            </div>
            <FilActu />
          </div>
        </div>
      ) : (
        <div className="background_image">
          <div className="welcome">
            <h1 className="title"> Bienvenue</h1>
            <br />
            <br />
            <p className="messages">
              Votre espace d'échange est à present disponible!
            </p>
            <br />
            <p className="messages">
              Venez intéragir avec l'ensemble des collaborateurs du groupe !
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
