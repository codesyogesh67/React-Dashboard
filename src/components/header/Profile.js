import React, { useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import db from "../../firebase";
import { useNavigate } from "react-router-dom";
import { selectUserInfo } from "../../features/userSlice";
import { updateDoc, doc } from "../../firebase";

function Profile() {
  const user = useSelector(selectUserInfo);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [emailId] = useState(user.email);
  const [userName, setUserName] = useState(user.username);
  const [userRole] = useState(user.role);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = doc(db, "users", "user.id")
    const docRef = async () => {
      const data = await updateDoc(q, {
        first_name: firstName,
        last_name: lastName,
        role: userRole,
        email: emailId,
        username: userName,
        id: user.id,
      })
    }
    // db.collection("users").doc(user.id).update({
    //   first_name: firstName,
    //   last_name: lastName,
    //   role: userRole,
    //   email: emailId,
    //   username: userName,
    //   id: user.id,
    // });
    docRef()
    history.push("/");
  };

  return (
    <div className="profile">
      <div className="profile__container">
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
          <div className="profile__row profile__email">
            <label>Email</label>
            <p>{emailId}</p>
          </div>
          <div className="profile__row">
            <label>Username</label>{" "}
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="profile__row">
            <label>Role</label> {user?.role === "manager"}
            <p className="profile__roleValue">{userRole}</p>
          </div>

          <button onClick={handleSubmit}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
