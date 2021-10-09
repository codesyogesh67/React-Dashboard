import React from "react";
import "./Users.css";
import UsersHeader from "./UsersHeader";
import UsersList from "./UsersList";

function Users() {
  return (
    <div className="users">
      <div className="users__container">
        <UsersHeader />
        <UsersList />
      </div>
    </div>
  );
}

export default Users;
