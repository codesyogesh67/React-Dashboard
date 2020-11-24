import React from "react";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Links() {
  const history = useHistory();

  const user = useSelector(selectUser);

  const signOut = () => {
    auth.signOut();
    return history.push("/login");
  };
  return (
    <div className="sidebar__links">
      {user.userInfo?.role === "Customer" ? (
        <>
          <Link className="sidebar__eachLink" to="/products">
            <LocalGroceryStoreIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Products</p>
          </Link>
          <Link to="/orders" className="sidebar__eachLink">
            <ListAltIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Orders</p>
          </Link>
          <ExitToAppIcon className="sidebar__logoutIcon" onClick={signOut} />
        </>
      ) : user.userInfo?.role === "Employee" ? (
        <>
          <Link className="sidebar__eachLink" to="/users">
            <PermIdentityIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Users</p>
          </Link>
          <Link className="sidebar__eachLink" to="/products">
            <LocalGroceryStoreIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Products</p>
          </Link>{" "}
          <Link to="/orders" className="sidebar__eachLink">
            <ListAltIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Orders</p>
          </Link>
          <ExitToAppIcon className="sidebar__logoutIcon" onClick={signOut} />
        </>
      ) : (
        <>
          <Link className="sidebar__eachLink" to="/users">
            <PermIdentityIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Users</p>
          </Link>
          <Link className="sidebar__eachLink" to="/products">
            <LocalGroceryStoreIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Products</p>
          </Link>{" "}
          <Link to="/orders" className="sidebar__eachLink">
            <ListAltIcon className="sidebar__icon" />
            <p className="sidebar__iconText">Orders</p>
          </Link>
          <ExitToAppIcon className="sidebar__logoutIcon" onClick={signOut} />
        </>
      )}
    </div>
  );
}

export default Links;
