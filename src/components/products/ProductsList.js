import React, { useEffect, useState } from "react";
import db from "../../firebase";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import "./Products.css";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Paper from "@material-ui/core/Paper";
import AddShoppingCartTwoToneIcon from "@material-ui/icons/AddShoppingCartTwoTone";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectProductUser } from "../../features/productSlice";

function ProductsList() {
  const { userInfo } = useSelector(selectUser);
  const [productList, setProductList] = useState([]);
  const { userId } = useSelector(selectProductUser);
  const user = JSON.parse(localStorage.getItem("user"));

  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    const unsubscribe = db.collection("products").onSnapshot((snapshot) => {
      setProductList(
        snapshot.docs?.map((doc) => ({
          productId: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => unsubscribe;
  }, []);

  const addToCart = (productId, name, price) => {
    const orderRef = db
      .collection("users")
      .doc(userId)
      .collection("cartItems")
      .where("productId", "==", productId);

    orderRef.get().then((snapshot) => {
      if (snapshot.docs.length < 1) {
        db.collection("users")
          .doc(userId)
          .collection("cartItems")
          .add({ productId, name, price, quantity: 1 });
      }
    });
  };
  const startEditing = (index) => {
    setEditIdx(index);
  };

  const handleChange = (value, fieldName, index) => {
    setProductList(
      productList.map((row, j) =>
        j === index
          ? { ...row, data: { ...row.data, [fieldName]: value } }
          : row
      )
    );
  };

  const deleteProduct = (productId) => {
    db.collection("products").doc(productId).delete();
  };

  const handleSubmit = (productId, index) => {
    const product = productList[index];

    db.collection("products")
      .doc(productId)
      .update({
        name: product.data.name,
        price: product.data.price,
        quantity: product.data.quantity,
        editedBy: user.first_name + " " + user.last_name,
      });
    setEditIdx(-1);
  };

  return (
    <div className="productsList">
      <h2 className="productsList__header"> List of Products</h2>

      <TableContainer component={Paper}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Sn.</TableCell>

              <TableCell align="center">Products</TableCell>
              <TableCell align="center">Price&nbsp;(dollars/each)</TableCell>
              <TableCell align="center">Quantity&nbsp;(pieces)</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map(
              ({ productId, data: { name, price, quantity } }, index) => (
                <TableRow key={productId}>
                  <TableCell>{index + 1}</TableCell>
                  {editIdx === index ? (
                    <>
                      <TableCell align="center">
                        {" "}
                        <input
                          className="productList__editInput"
                          value={name}
                          name="name"
                          onChange={(e) =>
                            handleChange(e.target.value, e.target.name, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <input
                          className="productList__editInput"
                          value={price}
                          name="price"
                          onChange={(e) =>
                            handleChange(e.target.value, e.target.name, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <input
                          className="productList__editInput"
                          value={quantity}
                          name="quantity"
                          onChange={(e) =>
                            handleChange(e.target.value, e.target.name, index)
                          }
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="center">{name}</TableCell>
                      <TableCell align="center"> $ {price}</TableCell>
                      <TableCell align="center">{quantity}</TableCell>
                    </>
                  )}

                  {userInfo?.role === "Customer" && (
                    <TableCell align="center">
                      <AddShoppingCartTwoToneIcon
                        className="productsList__cartIcon"
                        onClick={() => addToCart(productId, name, price)}
                      />
                    </TableCell>
                  )}

                  {userInfo?.role === "Manager" && (
                    <>
                      <TableCell align="center">
                        {editIdx === index ? (
                          <button
                            className="productList__editSave"
                            onClick={() => handleSubmit(productId, index)}
                          >
                            Submit
                          </button>
                        ) : (
                          <EditOutlinedIcon
                            className="productsList__editIcon"
                            onClick={() => startEditing(index)}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <CloseTwoToneIcon
                          className="productsList__deleteIcon"
                          onClick={() => deleteProduct(productId)}
                        />
                      </TableCell>
                    </>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductsList;
