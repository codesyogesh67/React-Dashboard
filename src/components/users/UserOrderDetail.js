import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

export default function CollapsibleTable(props) {
  const { orders } = props.location.state;

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

  return (
    <div className="userOrderDetail">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Order</TableCell>
              <TableCell align="center">Date Created</TableCell>
              <TableCell align="center">Total Items</TableCell>
              <TableCell align="center">Total Amount</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList[0].map((order) => (
              <UserOrderDetail key={order.id} data={order.data} id={order.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {id}
        </TableCell>
        <TableCell align="center">
          {typeof timestamp.toDate === "function"
            ? new Date(timestamp.toDate()).toLocaleDateString()
            : new Date(timestamp.seconds * 1000).toLocaleDateString()}
        </TableCell>
        <TableCell align="center">{totalQuantity}</TableCell>
        <TableCell align="center">$ {totalPrice}</TableCell>
        <TableCell align="center">{status}</TableCell>
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
                    <TableCell align="center">Total Amount</TableCell>
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
                        <TableCell align="center">$ {price}</TableCell>
                        <TableCell align="center">{quantity}</TableCell>
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
