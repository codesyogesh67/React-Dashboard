import React, { useState, useEffect } from "react";
import db from "../../firebase";
import UsersList from "./UsersList";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { removeStatusReducer } from "../../features/userSlice";

function UsersFilter({ usersList, customerList }) {
  const [rolesButton, setRolesButton] = useState(false);

  const [filteredList, setFilteredList] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOn, setFilterOn] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setFilterOn(false);
  }, [searchTerm]);

  const filterManager = () => {
    setShowAllUsers(false);

    const filterData = db.collection("users").onSnapshot((snapshot) => {
      const filterData = snapshot.docs.filter(
        (doc) => doc.data().role === "Manager"
      );
      setFilteredList(
        filterData?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };
  const filterEmployee = () => {
    setShowAllUsers(false);

    const filterData = db.collection("users").onSnapshot((snapshot) => {
      const filterData = snapshot.docs.filter(
        (doc) => doc.data().role === "Employee"
      );
      setFilteredList(
        filterData?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  const filterCustomer = () => {
    setShowAllUsers(false);

    const filterData = db.collection("users").onSnapshot((snapshot) => {
      const filterData = snapshot.docs.filter(
        (doc) => doc.data().role === "Customer"
      );
      setFilteredList(
        filterData?.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  const usersButton = () => {
    setShowAllUsers(true);
    setRolesButton(false);
    dispatch(removeStatusReducer(false));
  };

  const searchList = (e) => {
    e.preventDefault();
    setFilterOn(true);

    if (user.role === "Employee") {
      setFilteredList(
        customerList.filter(
          (list) =>
            list.data.first_name.includes(searchTerm) ||
            list.data.last_name.includes(searchTerm) ||
            list.data.email.includes(searchTerm)
        )
      );
    } else {
      setFilteredList(
        usersList.filter(
          (list) =>
            list.data.first_name.includes(searchTerm) ||
            list.data.last_name.includes(searchTerm) ||
            list.data.email.includes(searchTerm)
        )
      );
    }
  };

  return (
    <div className="usersFilter">
      {user?.role === "Manager" && (
        <div className="usersFilter__roles">
          <p className="usersFilter__viewBy">View By:</p>

          <button className="users__button" onClick={usersButton}>
            Users
          </button>

          <button
            onClick={() => {
              setRolesButton(true);
              dispatch(removeStatusReducer(false));
            }}
            className="users__button"
          >
            Roles
          </button>
        </div>
      )}

      {rolesButton && (
        <div className="usersHeader__filter">
          <button className="users__button" onClick={filterManager}>
            Manager
          </button>
          <button className="users__button" onClick={filterEmployee}>
            Employee
          </button>
          <button className="users__button" onClick={filterCustomer}>
            Customer
          </button>
        </div>
      )}
      <form className="usersFilter__search" onSubmit={searchList}>
        <SearchIcon className="usersFilter__searchIcon" />
        <input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {showAllUsers ? (
        filterOn ? (
          <UsersList usersList={filteredList} />
        ) : user?.role === "Employee" ? (
          <UsersList usersList={customerList} />
        ) : (
          <UsersList usersList={usersList} />
        )
      ) : (
        <UsersList usersList={filteredList} />
      )}
    </div>
  );
}

export default UsersFilter;
