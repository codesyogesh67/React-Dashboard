import React from "react";

import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./Sidebar.css";

import Links from "./Links";

function Sidebar() {
  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    return history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">Dashboard</div>
      <Links />
      <button className="sidebar__logout" onClick={signOut}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
