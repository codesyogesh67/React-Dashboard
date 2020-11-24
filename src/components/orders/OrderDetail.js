import React from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

function OrderDetail(props) {
  const {
    list,
    status,
    totalPrice,
    totalQuantity,
    id,
    timestamp,
    approveBy,
    approvedTimestamp,
  } = props.location.state;

  return (
    <div className="orderDetail">
      <TableContainer component={Paper}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Sn.</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Price&nbsp;(dollars/each)</TableCell>
              <TableCell align="center">Quantity&nbsp;</TableCell>
              <TableCell align="center">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map(
              ({ id, data: { name, price, quantity, productId } }, index) => (
                <TableRow key={productId}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {name}
                  </TableCell>

                  <TableCell align="center"> $ {price}</TableCell>
                  <TableCell align="center">{quantity}</TableCell>
                  <TableCell align="center">$ {price * quantity}</TableCell>
                </TableRow>
              )
            )}
            <TableRow className="orderDetail__totalRow">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">{totalQuantity}</TableCell>
              <TableCell align="center"> $ {totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/orders" className="orderDetail__back">
        Back to Orders
      </Link>
    </div>
  );
}

export default OrderDetail;
