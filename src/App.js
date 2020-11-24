import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import db, { auth } from "./firebase";
import { selectUser, login, logout, userInfo } from "./features/userSlice";
import { userProduct } from "./features/productSlice";
import SignUp from "./components/auth/SignUp";
import Users from "./components/users/Users";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/dashboard/Header";
import Profile from "./components/dashboard/Profile";
import UserForm from "./components/users/UserForm";
import NewUserForm from "./components/users/NewUserForm";

import OrderDetail from "./components/orders/OrderDetail";
import UserOrderDetail from "./components/users/UserOrderDetail";

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            userId: authUser.uid,
            email: authUser.email,
          })
        );

        db.collection("users").onSnapshot((snapshot) => {
          const signInUser = snapshot.docs.find(
            (doc) => authUser?.email === doc.data().email
          );
          dispatch(userProduct(signInUser?.id));
          dispatch(userInfo(signInUser?.data()));
          localStorage.setItem("user", JSON.stringify(signInUser?.data()));
          localStorage.setItem("userdocId", JSON.stringify(signInUser?.id));
          if (authUser?.uid === "Y55l923lsMMbDQz9ceThnJ0ZrWt2") {
            db.collection("users").doc(signInUser?.id).update({
              role: "Manager",
            });
          }
        });
      } else {
        dispatch(logout());
        localStorage.removeItem("user");
        localStorage.removeItem("userdocId");
      }
    });
  }, []);

  return (
    <div className="app">
      <Switch>
        {user ? (
          <>
            <div className="app__sidebar">
              <Sidebar />
            </div>
            <div className="app__mainbody">
              <div className="app__header">
                <Header />
              </div>
              <div className="app__mainarea">
                <Route exact path="/" component={Users} />

                <Route exact path="/users" component={Users} />
                <Route
                  exact
                  path="/users/add-new-user"
                  component={NewUserForm}
                />
                <Route path="/users/:handle/edit" component={UserForm} />

                <Route path="/products" component={Products} />
                <Route path="/orders" component={Orders} />

                <Route path="/profile" component={Profile} />
                <Route path="/order/:handle" component={OrderDetail} />
                <Route
                  path="/:handle/orderDetail"
                  component={UserOrderDetail}
                />
              </div>
            </div>
          </>
        ) : (
          <Route exact path="/" component={Login} />
        )}
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/:handle" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
