import React, { useState } from "react";
import db from "../../firebase";
import { makeStyles } from "@mui/styles";
import "./Orders.css";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Checkbox,
} from "@mui/material";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../../features/userSlice";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectOrdersList } from "../../features/orderSlice";

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

function Orders() {
  const user = useSelector(selectUserInfo);
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const ordersList = useSelector(selectOrdersList);

  const changeOrderStatus = (id, status) => {
    if (status === "Processing") {
      db.collection("orders")
        .doc(id)
        .update({
          status: "Approved",
          approvedTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
          approveBy: user.role === "Manager" ? "Manager" : user?.email,
        });
    } else {
      db.collection("orders").doc(id).update({
        status: "Processing",
      });
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const deleteOrder = () => {
    selected.map((id) => {
      db.collection("orders").doc(id).delete();
    });
    setSelected([]);
  };

  return (
    <div className="orders">
      <div className="orders__container">
        {selected?.length < 1 ? (
          <p className="orders__title">Orders</p>
        ) : (
          <div className="orders__selected">
            <p>
              {selected?.length} {selected?.length === 1 ? "item" : "items"}{" "}
              selected
            </p>
            <DeleteIcon className="orders__orderDelete" onClick={deleteOrder} />
          </div>
        )}

        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>

                <TableCell align="center">Order </TableCell>
                <TableCell align="center">Date Created</TableCell>
                <TableCell align="center">Total Items</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Status</TableCell>

                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersList?.map(
                (
                  {
                    id,
                    data,
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
                ) => {
                  const isItemSelected = isSelected(id);

                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={id}
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      selected={isItemSelected}
                      tabIndex={-1}
                    >
                      <TableCell align="center">
                        {user?.role === "Manager" && (
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) =>
                              user?.role === "Manager"
                                ? handleClick(event, id)
                                : null
                            }
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center" id={labelId}>
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
                          {user?.role === "Manager" ? customer.first_name : id}
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
                          status === "Processing"
                            ? "orders__processing"
                            : "orders__processed"
                        }
                      >
                        <span
                          className="orders__status"
                          onClick={() => changeOrderStatus(id, status)}
                        >
                          {status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Orders;
