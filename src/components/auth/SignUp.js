import React, { useState } from "react";
import "./SignUp.css";
import db, { auth } from "../../firebase";
import { Link, useHistory } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        db.collection("users").add({
          first_name: firstName.toLowerCase(),
          last_name: lastName.toLowerCase(),
          email: auth.user.email,
          username: username.toLowerCase(),
          id: auth.user.uid,
          role: "Customer",
        });
        history.push("/login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <h2 className="signup__title">SignUp</h2>
      <form className="signup__form">
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name..."
          type="name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name..."
          type="name"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username..."
          type="name"
        />
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
        <button onClick={signup}>Sign Up</button>
      </form>
      <div className="signup__info">
        Already a member.{" "}
        <Link to="login">
          <p className="signup__link">Log in</p>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
