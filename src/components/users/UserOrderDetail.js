import React, { useState } from "react";
import {
  Box,
  Collapse,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

export default function CollapsibleTable(props) {
  const { orders } = props.location.state;

  const history = useHistory();

  let orderList = [];
  orderList.push(
    orders.map(
      ({
        id,
        data: { timestamp, totalQuantity, totalPrice, status, list },
      }) => ({
        id,
        data: {
          timestamp,
          totalQuantity,
          totalPrice,
          status,
          list,
        },
      })
    )
  );
  const goback = () => {
    history.goBack();
  };

  return (
    <div className="userOrderDetail">
      <div className="userOrderDetail__container">
        <div className="userOrderDetail__back">
          <p onClick={goback}>{props?.location.state.username}</p>
          <span>/ OrderDetail </span>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Order</TableCell>
                <TableCell align="center">Date Created</TableCell>
                <TableCell align="center">Total Items</TableCell>
                <TableCell align="center">Total Amount</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList[0].map((order) => (
                <UserOrderDetail
                  key={order.id}
                  data={order.data}
                  id={order.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

function UserOrderDetail(props) {
  const [open, setOpen] = useState(false);

  const { data } = props;
  const { id } = props;

  const { timestamp, totalQuantity, totalPrice, status, list } = data;

  return (
    <React.Fragment>
      <TableRow className="userOrderDetail__mainRow">
        <TableCell
          component="th"
          scope="row"
          align="center"
          onClick={() => setOpen(!open)}
        >
          {id}
        </TableCell>
        <TableCell align="center">
          {typeof timestamp.toDate === "function"
            ? new Date(timestamp.toDate()).toLocaleDateString()
            : new Date(timestamp.seconds * 1000).toLocaleDateString()}
        </TableCell>
        <TableCell align="center">{totalQuantity}</TableCell>
        <TableCell align="center">$ {totalPrice}</TableCell>
        <TableCell align="center">
          <span
            className={
              status === "Processing"
                ? "status__processing"
                : "status__processed"
            }
          >
            {status}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              ></Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Product Id</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map(
                    ({
                      cartItemId,
                      data: { productId, name, price, quantity },
                    }) => (
                      <TableRow key={cartItemId}>
                        <TableCell component="th" scope="row" align="center">
                          {productId}
                        </TableCell>
                        <TableCell align="center">{name}</TableCell>
                        <TableCell align="center"> {quantity}</TableCell>
                        <TableCell align="center">
                          $ {price * quantity}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
