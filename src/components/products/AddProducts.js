import React, { useState } from "react";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Products.css";

function AddProducts() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const user = useSelector(selectUser);

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
          type="text"
        />
        <input
          value={price}
          onChange={(e) =>
            e.target.value.length < 6 && setPrice(Number(e.target.value))
          }
          placeholder="Price"
          type="number"
        />
        <input
          value={quantity}
          onChange={(e) =>
            e.target.value.length < 5 && setQuantity(Number(e.target.value))
          }
          placeholder="Quantity"
          type="number"
        />
        <button
          disabled={price < 1 || quantity < 1 || product.length < 1}
          onClick={submitProduct}
        >
          Save
        </button>
      </form>
    </>
  );
}

export default AddProducts;
