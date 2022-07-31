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
            <h3 className= "title" > Bienvenue</h3>
            <br />
            <br />
            <p className="messages">sur le réseau social pour partager avec vos collègues !</p>
          
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
