import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import FilActu from "../components/FilActu";




const Home = () => {
  

  return (
    
    <div className="home">
      <SideBar />
      <div className="main">
        <FilActu />
      </div>
      
    </div>
  );
};

export default Home;
