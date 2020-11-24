import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import db from "../../firebase";

function UserTransaction({ username, email, role }) {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (role === "Employee" || role === "Manager") {
      db.collection("orders")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const orders = snapshot.docs.filter(
            (doc) => doc.data().approveBy === email
          );
          setUserOrders(
            orders.map((order) => ({ id: order.id, data: order.data() }))
          );
        });
    } else {
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
    }
  }, []);

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
        <TableBody>
          <TableRow>
            <TableCell className="userTransaction__tablebody" align="center">
              {userOrders.length}
            </TableCell>
            <TableCell className="userTransaction__tablebody" align="center">
              $ {totalOrderAmount}
            </TableCell>
            <TableCell align="center" className="userTransaction__tablebody">
              {userOrders.length
                ? new Date(lastOrder?.toDate()).toLocaleDateString()
                : "-"}
            </TableCell>
          </TableRow>
          {userOrders.length > 0 && (
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell>
                <Link
                  to={{
                    pathname: `/${username}/orderDetail`,
                    state: { email, orders: userOrders },
                  }}
                  className="userTransaction__order"
                >
                  Go to Order Detail >>>>>
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTransaction;
