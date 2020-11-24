import React, { useState } from "react";
import Products from "./Products";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Products.css";
import { selectProductUser } from "../../features/productSlice";

function AddProducts() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const user = useSelector(selectUser);
  const { userId } = useSelector(selectProductUser);

  const submitProduct = (e) => {
    e.preventDefault();

    if (user) {
      db.collection("products").add({
        name: product.toLowerCase(),
        quantity: quantity,
        price: price,
        addedBy: user.userInfo?.first_name + " " + user.userInfo?.last_name,
      });
    }
    setProduct("");
    setQuantity("");
    setPrice("");
  };

  return (
    <>
      <h2 className="addproducts__title">Add Products</h2>

      <form className="addproducts__form">
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Name of product"
        />
        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
        />
        <input
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
        />
        <button onClick={submitProduct}>Save</button>
      </form>
    </>
  );
}

export default AddProducts;
