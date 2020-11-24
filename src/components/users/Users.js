import React, { useState, useEffect } from "react";
import "./Users.css";
import UsersHeader from "./UsersHeader";
import db from "../../firebase";
import UsersFilter from "./UsersFilter";

function Users() {
  const [usersList, setUsersList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsersList(
        snapshot.docs?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    db.collection("users").onSnapshot((snapshot) => {
      const list = snapshot.docs?.filter(
        (doc) => doc.data().role === "Customer"
      );

      setCustomerList(
        list.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="users">
      <div>
        {user?.role === "Manager" && <UsersHeader />}

        <UsersFilter usersList={usersList} customerList={customerList} />
      </div>
    </div>
  );
}

export default Users;
