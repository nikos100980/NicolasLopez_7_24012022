import React, { useState } from "react";
import axios from "axios";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = { email, password };
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      data,
      withCredentials: true,
    })
      .then((res) => {
        window.location = "/profil";
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.error);
      });
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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required="required"
          className="modal-input"
          autoFocus
        />
      </div>

      <br />
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required="required"
          className="modal-input"
          autoFocus
        />
      </div>
      <div className="error">{error}</div>
      <br />
      <div className="form-group">
        <input type="submit" value="Se connecter" className="modal-submit " />
      </div>
    </form>
  );
};

export default LoginForm;
