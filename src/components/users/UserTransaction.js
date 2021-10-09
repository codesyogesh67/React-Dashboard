import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableContainer,
} from "@mui/material";

import db from "../../firebase";

function UserTransaction({ username, email, role }) {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    db.collection("orders")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const orders = snapshot.docs.filter(
          (doc) => doc.data().customer.email === email
        );
        setUserOrders(
          orders.map((order) => ({ id: order.id, data: order.data() }))
        );
      });
  }, [email]);

  let amount = [];
  userOrders.map((userOrder) => {
    amount.push(userOrder?.data.totalPrice);
  });

  const totalOrderAmount = amount.reduce((a, b) => a + b, 0);
  const lastOrder = userOrders[0]?.data.timestamp;

  return (
    <TableContainer className="userTransaction" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="userTransaction__tableHead">
              Total Order
            </TableCell>
            <TableCell align="center" className="userTransaction__tableHead">
              Total Amount Spent
            </TableCell>
            <TableCell align="center" className="userTransaction__tableHead">
              Last Order
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="userTransaction__tablebody">
          <TableRow>
            <TableCell align="center">{userOrders.length}</TableCell>
            <TableCell align="center">$ {totalOrderAmount}</TableCell>
            <TableCell align="center">
              {userOrders.length
                ? new Date(lastOrder?.toDate()).toLocaleDateString()
                : "-"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Link
        to={{
          pathname: `/${username}/orderDetail`,
          state: { email, username, orders: userOrders },
        }}
        className="userTransaction__order"
      >
        Go to Order Detail >>>>>
      </Link>
    </TableContainer>
  );
}

export default UserTransaction;
