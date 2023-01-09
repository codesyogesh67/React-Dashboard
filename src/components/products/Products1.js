import React from "react";
import ProductsList from "./ProductsList";
import AddProducts from "./AddProducts";
import "./Products.css";
import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../features/userSlice";
import CartItems from "./CartItems";
import Header from "../header/Header";

function Products() {
  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="products">
      <Header title="Products" />
      <div className="mainbody">
        {userInfo?.role === "Manager" ? <AddProducts /> : <CartItems />}

        <ProductsList />
      </div>
    </div>
  );
}

export default Products;
