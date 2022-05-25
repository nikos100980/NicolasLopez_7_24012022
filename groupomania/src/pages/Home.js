import React, { useContext } from "react";
import SideBar from "../components/Sidebar/SideBar";
import FilActu from "../components/FilActu";
import { UidContext } from "../components/AppContext";



const Home = () => {
  const uid = useContext(UidContext);

  return (
<>
    {uid ? (
      <div className="home">
      <SideBar />
      <div className="main">
        <FilActu />
      </div>
      
    </div> 
    ):(
      <div className="home">
      
      <div className="main">
        
      </div>
      
    </div>
    )}

   
    </>
  );
};

export default Home;
