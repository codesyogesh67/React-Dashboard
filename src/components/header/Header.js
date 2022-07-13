import React from "react";
import { selectUserInfo } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import "./BoxModal.css";

import { Link } from "react-router-dom";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import IconButton from "@mui/material/IconButton";
import {
  showSideBar,
  selectModalStatus,
  updateModalStatus,
  selectSidebar,
} from "../../features/extraSlice";
import { Avatar, Modal } from "@mui/material";

function Header() {
  const user = useSelector(selectUserInfo);

  const dispatch = useDispatch();
  const modalStatus = useSelector(selectModalStatus);
  const sidebar = useSelector(selectSidebar);

  const handleToggle = () => {
    dispatch(showSideBar());
  };

  return (
    <div className="header">
      <div className="header__container">
        <IconButton onClick={handleToggle}>
          <DragHandleIcon className="header__draghandleIcon" />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(updateModalStatus());
            if (sidebar) {
              dispatch(showSideBar());
            }
          }}
        >
          <Avatar
            className="header__avatar"
            alt={user?.first_name?.toUpperCase()}
            src="#"
          />
        </IconButton>
        <Modal
          open={modalStatus}
          onClose={() => dispatch(updateModalStatus())}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          {/* <BoxModal /> */}
          <div className="boxModal">
            <Avatar
              className="boxModal__avatar"
              alt={user?.first_name?.toUpperCase()}
              src="#"
            />
            <p className="boxModal__name">
              {user?.first_name + " " + user?.last_name}
            </p>
            <p className="boxModal__email">{user?.email}</p>
            <Link
              className="boxModal__profileEdit"
              onClick={() => dispatch(updateModalStatus())}
              to="/profile"
            >
              Edit
            </Link>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
