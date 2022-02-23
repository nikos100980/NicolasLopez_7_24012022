
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ctrlPassword, setCtrlPassword]= useState('');

  const handleRegister = async (e) => {
      e.preventDefault();

      if(password !== ctrlPassword){
          window.alert ('Merci de verifier les mots de passe !');
      }else{
          await axios({
              method: 'post',
              url:`${process.env.REACT_APP_API_URL}api/auth/signup`,
              withCredentials: true,
              data: {
                  firstname,
                  lastname,
                  email,
                  password
              }
          }).then((res) => {
            console.log(res);
            window.location = "/";
          })
          .catch((error) => {
            console.log(error);
          });
      }

  };

  return (
    <div>
      <form action="" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="firstname">Votre prénom</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Votre nom</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Votre mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-control">Confirmez votre mot de passe</label>
          <input
            type="password"
            name="password"
            id="password-control"
            onChange={(e) => setCtrlPassword(e.target.value)}
            value={ctrlPassword}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="S'inscrire" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
