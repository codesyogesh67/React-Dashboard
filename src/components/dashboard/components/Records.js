import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import db from "../../../firebase";
import { selectUserInfo } from "../../../features/userSlice";
import { useSelector } from "react-redux";
import GroupIcon from "@mui/icons-material/Group";
import { selectOrdersList } from "../../../features/orderSlice";

function Records() {
  const user = useSelector(selectUserInfo);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const ordersList = useSelector(selectOrdersList);

  useEffect(() => {
    const total = [];
    const customers = [];

    if (ordersList?.length > 0) {
      ordersList.map((order) => total.push(order.data.totalPrice));
    }
    setTotalIncome(total.reduce((a, b) => a + b, 0));

    db.collection("users").onSnapshot((snapshot) => {
      snapshot.docs.filter((doc) => {
        if (doc.data().role === "Customer") {
          customers.push(doc);
        }
      });

      setTotalCustomers(customers.length);
    });
  }, [ordersList]);

  const pendingOrders = ordersList?.filter(
    (order) => order.data.status === "Processing"
  );

  return (
    <div className="dashboard__records">
      {user?.role === "Manager" && (
        <>
          <div className="dashboard__record">
            <div className="dashboard__recordLabel">
              <GroupIcon className="dashboard__icon" />
              <p>Total Customers</p>
            </div>


            <p className="dashboard__value">{totalCustomers}
            </p>


          </div>
          <div className="dashboard__record dashboard__dailyValue">
            {" "}
            <div className="dashboard__recordLabel">
              <ShoppingCartOutlinedIcon className="dashboard__icon" />
              <p >

                Total Pending </p>
            </div>
            <p className="dashboard__value">{pendingOrders?.length}</p>

          </div>

        </>
      )
      }

      <div className="dashboard__record dashboard__totalOrders">
        {" "}
        <div className="dashboard__recordLabel">
          <ListAltIcon className="dashboard__icon" />
          <p>Total Orders</p>
        </div>
        <p className="dashboard__value">
          {ordersList?.length}
        </p>
      </div>
      <div className="dashboard__record dashboard__totalIncome">
        {" "}
        <div className="dashboard__recordLabel">
          <MonetizationOnOutlinedIcon className="dashboard__icon" />
          <p >{user?.role === "Manager" ? "Total Income" : "Total Expenses"}</p>

        </div>
        <p className="dashboard__value">{totalIncome}</p>


      </div>
    </div>
  );
}

export default Records;
