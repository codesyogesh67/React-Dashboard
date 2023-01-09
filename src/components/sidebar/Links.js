import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../../features/userSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { showSideBar, updateFilterStatus } from "../../features/extraSlice";
import { emptyOrderList } from "../../features/orderSlice";

function Links() {
  const history = useNavigate();

  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(showSideBar());
    dispatch(emptyOrderList());
    dispatch(updateFilterStatus(false));

    auth.signOut();

    return history.push("/login");
  };
  return (
    <div className="sidebar__links">
      <Link
        className="sidebar__eachLink"
        onClick={() => dispatch(showSideBar())}
        to="/"
      >
        <DashboardIcon className="sidebar__icon" />
        <p className="sidebar__iconText">Dashboard</p>
      </Link>
      {user?.role === "Manager" && (
        <Link
          className="sidebar__eachLink"
          to="/users"
          onClick={() => dispatch(showSideBar())}
        >
          <PermIdentityIcon className="sidebar__icon" />
          <p className="sidebar__iconText">Users</p>
        </Link>
      )}
      <Link
        className="sidebar__eachLink"
        onClick={() => dispatch(showSideBar())}
        to="/products"
      >
        <LocalGroceryStoreIcon className="sidebar__icon" />
        <p className="sidebar__iconText">Products</p>
      </Link>{" "}
      {/* <Link
        className="sidebar__eachLink"
        onClick={() => dispatch(showSideBar())}
        to="/customers"
      >
        <AssignmentIndIcon className="sidebar__icon" />
        <p className="sidebar__iconText">Customers</p>
      </Link>{" "} */}
      <Link
        to="/orders"
        onClick={() => dispatch(showSideBar())}
        className="sidebar__eachLink"
      >
        <ListAltIcon className="sidebar__icon" />
        <p className="sidebar__iconText">Orders</p>
      </Link>
      <Link to="/orders" onClick={signOut} className="sidebar__eachLink">
        <ExitToAppIcon className="sidebar__icon" />

        <p className="sidebar__iconText">Logout</p>
      </Link>
    </div>
  );
}

export default Links;
