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
        <div className="home">
          home
          <div className="main">maison</div>
        </div>
      )}
    </>
  );
};

export default Home;
