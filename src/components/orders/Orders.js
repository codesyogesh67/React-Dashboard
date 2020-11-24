import React, { useState, useEffect } from "react";
import "./Orders.css";
import db from "../../firebase";
import OrderTable from "./OrderTable";

function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [ordersManager, setOrdersManager] = useState([]);
  const [ordersCustomer, setOrdersCustomer] = useState([]);

  useEffect(() => {
    db.collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const orders = snapshot.docs.filter((doc) => {
          return doc.data().customer?.email === user?.email;
        });

        setOrdersManager(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );

        setOrdersCustomer(
          orders?.map((order) => ({
            id: order.id,
            data: order.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="orders">
      <p className="orders__title">Orders</p>
      {user?.role === "Employee" ? (
        <OrderTable data={ordersManager} />
      ) : user?.role === "Manager" ? (
        <OrderTable data={ordersManager} />
      ) : (
        <OrderTable data={ordersCustomer} />
      )}
    </div>
  );
}

export default Orders;
