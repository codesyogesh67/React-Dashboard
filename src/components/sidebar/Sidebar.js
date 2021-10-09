import React from "react";

import "./Sidebar.css";

import Links from "./Links";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar, showSideBar } from "../../features/extraSlice";

function Sidebar() {
  const sidebar = useSelector(selectSidebar);
  const dispatch = useDispatch();

  return (
    <div className={sidebar ? "sidebar" : "sidebar sidebar__hide"}>
      <p className="sidebar__cancel" onClick={() => dispatch(showSideBar())}>
        x
      </p>
      <div className="sidebar__wrapper">
        <div className="sidebar__header">
          <Avatar src="1.jpg" alt="OM">
            OM
          </Avatar>
          <p className="sidebar__title"> Order MGMT</p>
        </div>
        <Links />
      </div>
    </div>
  );
}

export default Sidebar;
