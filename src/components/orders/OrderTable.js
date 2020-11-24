import React from "react";
import db from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import firebase from "firebase";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

function OrderTable({ data }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();

  const changeOrderStatus = (id, status) => {
    if (status === "Processing") {
      db.collection("orders")
        .doc(id)
        .update({
          status: "Processed",
          approvedTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          approveBy: user.role === "Manager" ? "Manager" : user?.email,
        });
    } else {
      db.collection("orders").doc(id).update({
        status: "Processing",
      });
    }
  };
  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Sn.</TableCell>

            <TableCell align="center">Order No.</TableCell>
            <TableCell align="center">Date Created</TableCell>
            <TableCell align="center">Total Items</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Order by</TableCell>
            {user.role === "Customer" ? (
              <TableCell align="center">Approval Status</TableCell>
            ) : (
              <>
                <TableCell align="center">Approved by</TableCell>
                <TableCell align="center">Approved Date</TableCell>
              </>
            )}

            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(
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
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {" "}
                  <Link
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
                    {id}{" "}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {new Date(timestamp?.toDate()).toLocaleDateString()}
                </TableCell>
                <TableCell align="center"> {totalQuantity}</TableCell>
                <TableCell align="center">${totalPrice}</TableCell>
                <TableCell
                  align="center"
                  className={
                    status === "processing"
                      ? "orders__processing"
                      : "orders__processed"
                  }
                >
                  {status}
                </TableCell>
                <TableCell align="center">{customer.email}</TableCell>
                {status === "Processing" ? (
                  user.role === "Customer" ? (
                    <TableCell align="center">Waiting for Approval</TableCell>
                  ) : (
                    <>
                      <TableCell align="center">Waiting for Approval</TableCell>
                      <TableCell align="center">NA</TableCell>
                      <TableCell>
                        <button
                          className={
                            status === "Processing"
                              ? "orderTable__Button processingButton"
                              : "orderTable__Button approvedButton"
                          }
                          onClick={() => changeOrderStatus(id, status)}
                        >
                          {status === "Processing"
                            ? "Give Approval"
                            : "Approved"}
                        </button>
                      </TableCell>
                    </>
                  )
                ) : user.role === "Manager" || user.role === "Employee" ? (
                  <>
                    <TableCell align="center">{approveBy}</TableCell>
                    <TableCell align="center">
                      {approvedTimestamp?.toDate().toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <button
                        className={
                          status === "Processing"
                            ? "orderTable__Button processingButton"
                            : "orderTable__Button approvedButton"
                        }
                        onClick={() => changeOrderStatus(id, status)}
                      >
                        {status === "Processing" ? "Give Approval" : "Approved"}
                      </button>
                    </TableCell>
                  </>
                ) : (
                  <TableCell align="center">Approved</TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;
