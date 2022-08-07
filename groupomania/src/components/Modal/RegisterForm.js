import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";


const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ctrlPassword, setCtrlPassword] = useState("");
  const [error, setError] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== ctrlPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        withCredentials: true,
        data: {
          firstName,
          lastName,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          setFormSubmit(true);
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data.error);
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <LoginForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="firstName">Votre prénom</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => 
                setFirstName(e.target.value)
                
              }
              value={firstName}
              className="modal-input"
            />
            
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Votre nom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="modal-input"
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
              className="modal-input"
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
              className="modal-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password-control">
              Confirmez votre mot de passe
            </label>
            <input
              type="password"
              name="password"
              id="password-control"
              onChange={(e) => setCtrlPassword(e.target.value)}
              value={ctrlPassword}
              className="modal-input"
            />
          </div>
          <div className="error">{error}</div>
          <div className="form-group">
            <input type="submit" value="S'inscrire" className="modal-submit" />
          </div>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
