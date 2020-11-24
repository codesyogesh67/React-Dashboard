import React, { useState } from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import "./Header.css";
import { Link } from "react-router-dom";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Sidebar from "../sidebar/Sidebar";
import IconButton from "@material-ui/core/IconButton";

function Header() {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <div className="header__icons">
        <IconButton onClick={handleToggle}>
          <DragHandleIcon className="header__draghandleIcon" />
        </IconButton>

        <div className="header__avatar">
          <Link to="/profile">
            <Avatar src="1.jpg" alt={user.userInfo?.first_name} />
          </Link>

          <h2>{user.userInfo?.role}</h2>
        </div>
      </div>

      <ul
        className={isOpen ? "header__links  header__shownav" : "header__links"}
      >
        <Sidebar />
      </ul>
    </div>
  );
}

export default Header;
