import React, { useState } from "react";
import axios from "axios";
import {isEmail} from "validator";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const validateInputs = () => {
      if (!isEmail(email)) {
        setEmailError("L'email ne correspond à aucun compte enregistré !");
        setValidForm(false);
      } else setValidForm(true);
      if (password.length < 8) {
        setPasswordError("Mot de passe incorrect");
        setValidForm(false);
      } else setValidForm(true);
    };
    validateInputs();
    if (validForm) {
      const data = { email, password };
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/login`,
        data,
        withCredentials: true,
      })
        .then((res) => (window.location = "/"))
        .catch((err) => {
          if (err.response.data.credentials) {
            setPasswordError(err.response.data.credentials);
          }
        });
    }
  };

  return (
    <form action="" onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          value={email}
          required="required"
          className="modal-input"
          autoFocus
        />
        <p className="error-msg email-error">{emailError}</p>
      </div>

      <br />
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          value={password}
          required="required"
          className="modal-input"
          autoFocus
        />

      </div>
      <p className="error-msg password-error">{passwordError}</p>
      <br />
      <div className="form-group">
        <input type="submit" value="Se connecter" className="modal-submit " />
      </div>
    </form>
  );
};

export default LoginForm;
