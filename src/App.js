import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import db, { auth } from "./firebase";
import PrivateRoute from "./PrivateRoute";
import {
  selectUser,
  login,
  logout,
  selectUserInfo,
  updateUserInfo,
} from "./features/userSlice";
import SignUp from "./components/auth/SignUp";
import Users from "./components/users/Users";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Profile from "./components/header/Profile";
import UserForm from "./components/users/UserForm";
import NewUserForm from "./components/users/NewUserForm";


import OrderDetail from "./components/orders/OrderDetail";
import UserOrderDetail from "./components/users/UserOrderDetail";
import Dashboard from "./components/dashboard/Dashboard";

import RestrictedRoute from "./RestrictedRoute";
import { updateOrders } from "./features/orderSlice";
import { getDoc, where, onAuthStateChanged, collection, getAuth, getDocs, query, doc } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);

  const dispatch = useDispatch();


  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userId: authUser.uid,
            email: authUser.email,
          })
        );



        const q = query(collection(db, "users"), where("email", "==", authUser.email))

        const querySnapshot = await getDocs(q)


        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach(doc => {
            const {
              first_name,
              last_name,
              email,
              role,
              username,
            } = doc.data();


            dispatch(
              updateUserInfo({
                id: doc.id,
                first_name,
                last_name,
                email,
                role,
                username,
              }))

          })
        }



        else {
          dispatch(logout())
        }





      }
    })
  }, []);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />

          <div className="app__mainbody">
            <Header />
            <div className="app__main">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <PrivateRoute exact path="/users" component={Users} />

                <Route
                  exact
                  path="/users/add-new-user"
                  component={NewUserForm}
                />
                <Route path="/users/:handle/edit" component={UserForm} />

                <Route exact path="/orders" component={Orders} />
                <Route exact path="/products" component={Products} />
                <Route path="/products" component={Dashboard} />

                <Route path="/profile" component={Profile} />
                <Route path="/order/:handle" component={OrderDetail} />
                <Route
                  path="/:handle/orderDetail"
                  component={UserOrderDetail}
                />
                <RestrictedRoute path="/:handle" />
              </Switch>
            </div>
          </div>
        </>
      ) : (
          <>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <RestrictedRoute path="/:handle" />
            </Switch>
          </>
        )}
    </div>
  );
}

export default App;
