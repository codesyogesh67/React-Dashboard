import React, { useState } from "react";
import "./UserForm.css";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Link, useHistory } from "react-router-dom";
import UserTransaction from "./UserTransaction";

function UserForm(props) {
  const {
    first_name,
    last_name,
    email,
    username,
    role,
    id,
  } = props.location.state;

  const user = useSelector(selectUser);
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [emailId, setEmailId] = useState(email);
  const [userName, setUserName] = useState(username);
  const [userRole, setUserRole] = useState(role);
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      db.collection("users").doc(id).update({
        first_name: firstName,
        last_name: lastName,
        email: emailId,
        username: userName,
        role: userRole,
      });
      history.push("/users");
    }
  };
  return (
    <div className="userForm">
      <UserTransaction username={userName} email={emailId} role={role} />
      <form className="userForm__form" onSubmit={handleSubmit}>
        <div className="userForm__row">
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="userForm__row">
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="userForm__row">
          <label>Email</label>
          <input value={emailId} onChange={(e) => setEmailId(e.target.value)} />
        </div>
        <div className="userForm__row">
          <label>Username</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="userForm__row">
          <label>Role</label>{" "}
          {userInfo.role === "Employee" ? (
            <input
              style={{ border: "none", background: "transparent" }}
              defaultValue="Customer"
            />
          ) : (
            <input
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            />
          )}
        </div>

        <div className="userForm__buttons">
          <button>Save</button>
          <Link to="/users">
            <button className="userForm__back">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
