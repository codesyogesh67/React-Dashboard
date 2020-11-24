import React, { useState } from "react";
import "./Login.css";
import db, { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    db.collection("users").onSnapshot((snapshot) => {
      const userdb = snapshot.docs.find((doc) => doc.data().email === email);

      if (userdb) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
            return history.push("/");
          })
          .catch((error) => alert(error.message));
      } else {
        setMessage("Your account has be accessed right now.");
      }
    });
  };

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>
      <h2>{message}</h2>
      <form className="login__form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
          type="password"
        />
        <button onClick={login}>Sign in</button>
      </form>
      <div className="login__info">
        Not a member yet ?{" "}
        <Link to="/signup">
          <p className="login__link">Sign up</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
