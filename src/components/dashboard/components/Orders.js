import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";
import "../../orders/Orders.css";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../../../features/userSlice";
import { Link } from "react-router-dom";
import { selectOrdersList, updateOrders } from "../../../features/orderSlice";
import db from "../../../firebase";

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

function Orders() {
  const classes = useStyles();

  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectOrdersList);
  const dispatch = useDispatch();
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    if (user?.role === "Manager") {
      const ref = db.collection("orders");

      ref.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        dispatch(
          updateOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
        setOrdersList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      db.collection("orders")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const orderList = snapshot.docs.filter((doc) => {
            if (doc.data().customer?.email === user?.email) {
              dispatch(
                updateOrders(
                  orderList?.map((order) => ({
                    id: order.id,
                    data: order.data(),
                  }))
                )
              );
              setOrdersList(
                orderList?.map((order) => ({
                  id: order.id,
                  data: order.data(),
                }))
              );
            }
          });
        });
    }
  }, [user]);

  return (
    <div className="dashboard__orders">
      <p>Latest Transactions</p>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <span>{user?.role === "Manager" ? "Customer" : "Id"}</span>
              </TableCell>
              <TableCell align="center">Date </TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>

              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList?.map(
              (
                {
                  id,
                  data: {
                    customer,
                    list,
                    timestamp,
                    status,
                    totalPrice,
                    totalQuantity,
                    approveBy,
                    approvedTimestamp,
                  },
                },
                index
              ) => (
                <TableRow key={id}>
                  <TableCell align="center">
                    {" "}
                    <Link
                      className="dashboard__ordersCustomer"
                      to={{
                        pathname: `/order/${id}`,
                        state: {
                          list,
                          status,
                          totalPrice,
                          totalQuantity,
                          timestamp,
                          id,
                          approveBy,
                          approvedTimestamp,
                        },
                      }}
                    >
                      {user?.role === "Manager" ? (
                        <>
                          <Avatar
                            alt={customer.first_name.toUpperCase()}
                            src="#"
                          />
                          <span className="dashboard__ordersName">
                            {customer.first_name} {customer.last_name}
                          </span>
                        </>
                      ) : (
                        <span className="dashboard__ordersName">{id}</span>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {new Date(timestamp?.toDate()).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">${totalPrice}</TableCell>
                  <TableCell
                    align="center"
                    className={
                      status === "Processing"
                        ? "orders__processing"
                        : "orders__processed"
                    }
                  >
                    <span> {status}</span>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
