import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";

const App =  () =>{
  const [uid, setUid] = useState(null);

   useEffect( () => {
     const axiosToken = async ()=>{

       await axios({
         method: "get",
         url: `${process.env.REACT_APP_API_URL}jwtid`,
         withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUid(res.data);
          
        })
        .catch((error) => {
          console.log("Pas de token présent");
        });
      };
      axiosToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
