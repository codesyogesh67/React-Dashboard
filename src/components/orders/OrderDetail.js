import React from "react";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@mui/material";

import { useHistory } from "react-router-dom";

function OrderDetail(props) {
  const history = useHistory();
  const { list, totalPrice, totalQuantity } = props.location.state;

  const backtoOrderDetail = () => {
    history.goBack();
  };

  return (
    <div className="orderDetail">
      <div className="orderDetail__container">
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

        <button onClick={backtoOrderDetail} className="orderDetail__back">
          Back to Orders
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
