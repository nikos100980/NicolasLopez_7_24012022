import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/auth/login`,
      withCredentials: true,

      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
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
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="form-group">
        <input type="submit" value="Se connecter" />
      </div>
    </form>
  );
};

export default LoginForm;
