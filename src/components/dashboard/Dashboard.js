import React from "react";
import "./Dashboard.css";

import Customers from "./components/Customers";
import Orders from "./components/Orders";

import Records from "./components/Records";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userSlice";

function Dashboard() {
  const user = useSelector(selectUserInfo);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__wrapper">
          <div className="dashboard__title">Dashboard</div>
          <div className="dashboard__upperSection">
            <Records />
            {/* <div className="dashboard__graph">
            <Charts />
          </div> */}
          </div>{" "}
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
