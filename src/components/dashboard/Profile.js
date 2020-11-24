import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { selectProductUser } from "../../features/productSlice";
import db from "../../firebase";
import { useHistory } from "react-router-dom";

function Profile() {
  const { userId } = useSelector(selectProductUser);

  const userLocal = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState(userLocal.first_name);
  const [lastName, setLastName] = useState(userLocal.last_name);
  const [emailId] = useState(userLocal.email);
  const [userName, setUserName] = useState(userLocal.username);
  const [userRole] = useState(userLocal.role);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("users").doc(userId).update({
      first_name: firstName,
      last_name: lastName,
      role: userRole,
      email: emailId,
      username: userName,
      id: userLocal.id,
    });
    history.push("/");
  };

  return (
    <div className="profile">
      <form className="profile__form">
        <div className="profile__row">
          <label>First Name</label>

          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="profile__row">
          <label>Last Name</label>

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="profile__row">
          <label>Email</label>
          <p className="profile__roleValue">{emailId}</p>
        </div>
        <div className="profile__row">
          <label>Username</label>{" "}
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="profile__row">
          <label>Role</label> {userLocal?.role === "manager"}
          <p className="profile__roleValue">{userRole}</p>
        </div>

        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

export default Profile;
