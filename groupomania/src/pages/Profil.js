import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <div className="img-container"></div>
        </div>
      )}
    </div>
  );
};

export default Profil;
