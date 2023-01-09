import React from "react";
import "./Dashboard.css";

import Customers from "./components/Customers1";
import Orders from "./components/Orders";

import Records from "./components/Records1";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userSlice";

function Dashboard() {
  const user = useSelector(selectUserInfo);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__wrapper">
          <div className="dashboard__title">Welcome, <span>
            {user?.first_name}  </span></div>

          <Records />
          {/* <div className="dashboard__graph">
            <Charts />
          </div> */}

          <div className="dashboard__lowerSection">
            {user?.role === "Manager" && (
              <div className="dashboard__customerData">
                <Customers />
              </div>
            )}

            <div className="dashboard__orderData">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
