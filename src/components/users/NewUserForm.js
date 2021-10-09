import React, { useState } from "react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import db, { auth } from "../../firebase";
import { Link } from "react-router-dom";

function NewUserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const addUser = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        db.collection("users").add({
          first_name: firstName,
          last_name: lastName,
          email: auth.user.email,
          username: username,
          id: auth.user.uid,
          role: role,
        });
      })
      .catch((error) => alert(error.message));
    auth.signOut();
  };

  return (
    <div className="newUserForm">
      <div className="newUserForm__container">
        <Link className="newUserForm__header" to="/users">
          <button className="newUserForm__backButton">
            <SkipPreviousIcon className="newUserForm__previousButton" />
            Users
          </button>
        </Link>
        <h2 className="newUserForm__title">Add new User</h2>
        <form className="newUserForm__form">
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
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role..."
            type="text"
          />
          <button onClick={addUser}>Add User</button>
        </form>
      </div>
    </div>
  );
}

export default NewUserForm;
