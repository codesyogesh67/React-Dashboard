import React, { useState } from "react";
import db, { addDoc, collection } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./Products.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Typography, Box } from "@mui/material";

function AddProducts() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const user = useSelector(selectUser);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const submitProduct = (e) => {
    e.preventDefault();

    if (user) {
      addDoc(collection(db, "products"), {
        name: product.toLowerCase(),
        quantity: quantity,
        price: price,
        addedBy: user.userInfo?.first_name + " " + user.userInfo?.last_name,
      })

    }
    setProduct("");
    setQuantity("");
    setPrice("");
  };

  return (
    <>
      {/* <h2 className="addproducts__title" color={colors.greenAccent[400]}>Add Products</h2> */}
      <Box display="flex" justifyContent="center" py="1rem">
        <Typography
          variant="h2"
          color={colors.greenAccent[400]}
          fontWeight="bold"
        // sx={{ m: "0 0 5px 0" }}
        >
          Add Products
      </Typography>
      </Box>
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
