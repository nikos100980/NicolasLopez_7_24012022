import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ctrlPassword, setCtrlPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(".password-conf.error");

    confirmPasswordError.innerHTML = "";
    passwordError.innerHTML = "";
    emailError.innerHTML = "";
    

    if (password !== ctrlPassword) {
      confirmPasswordError.innerHTML =
        "Les mots de passe ne correspondent pas !";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        withCredentials: true,
        data: {
          firstname,
          lastname,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          setFormSubmit(true);
        })
        .catch((err) => {
          if (err.response.data.error.length === 3) {
            emailError.innerHTML = err.response.data.error[0].message;
            passwordError.innerHTML = err.response.data.error[1].message;
            pseudoError.innerHTML = err.response.data.error[2].message;
          }
          if (err.response.data.error.length === 2) {
            if (err.response.data.error[0].path === "email") {
              emailError.innerHTML = err.response.data.error[0].message;
              if (err.response.data.error[1].path === "password") {
                passwordError.innerHTML = err.response.data.error[1].message;
              } else {
                pseudoError.innerHTML = err.response.data.error[1].message;
              }
            } else if (err.response.data.error[0].path === "password") {
              passwordError.innerHTML = err.response.data.error[0].message;
              pseudoError.innerHTML = err.response.data.error[1].message;
            }
          } else {
            if (err.response.data.error[0].path === "email") {
              emailError.innerHTML = err.response.data.error[0].message;
            } else if (err.response.data.error[0].path ==="password") {
              passwordError.innerHTML = err.response.data.error[0].message;
            } else if (err.response.data.error[0].path === "pseudo") {
              pseudoError.innerHTML = err.response.data.error[0].message;
            }
          }
        });
    }
  };

  return (
    <div>
      {formSubmit ? (
        <>
          <LoginForm />
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
      <form action="" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="firstname">Votre prénom</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            className="modal-input"
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
            className="modal-input"
          />
        </div>
        <div className="pseudo error"></div>
        <br />
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
        <div className="email error"></div>
        <br />
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
        <div className="password-conf error"></div>
        <br />
        <div className="form-group">
          <label htmlFor="password-control">Confirmez votre mot de passe</label>
          <input
            type="password"
            name="password"
            id="password-control"
            onChange={(e) => setCtrlPassword(e.target.value)}
            value={ctrlPassword}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="S'inscrire" className="modal-submit" />
        </div>
      </form>
      )}
    </div>
  );
};

export default RegisterForm;
