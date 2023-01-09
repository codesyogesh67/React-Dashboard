import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import db, { auth } from "./firebase";
import PrivateRoute from "./PrivateRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
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
import Topbar from "./components/sidebar/Topbar";
import UserDashboard from "./components/dashboard/UserDashboard";

function App() {
    const user = useSelector(selectUser);
    const [theme, colorMode] = useMode();
    const userInfo = useSelector(selectUserInfo);
    const [isSidebar, setIsSidebar] = useState(true);


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
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    {
                        user ? (
                            <>
                                <Sidebar isSidebar={isSidebar} />

                                <main className="content">
                                    <Topbar setIsSidebar={setIsSidebar} />
                                    <Routes>
                                        <Route exact path="/" element={<Dashboard />} />
                                        {/* <Route exact path="/users"
                                        element={
                                            <PrivateRoute>
                                                <Users />
                                            </PrivateRoute>
                                        }
                                    /> */}
                                        <Route exact path="/dashboard/:user" element={<UserDashboard />} />
                                        <Route exact path="/users" element={<Users />} />

                                        <Route
                                            exact
                                            path="/users/add-new-user"
                                            element={<NewUserForm />}
                                        />
                                        <Route path="/users/:handle/edit" element={<UserForm />} />

                                        <Route exact path="/orders" element={<Orders />} />
                                        <Route exact path="/products" element={<Products />} />


                                        <Route path="/profile" element={<Profile />} />
                                        <Route path="/order/:handle" element={<OrderDetail />} />
                                        <Route
                                            path="/:handle/orderDetail"
                                            element={<UserOrderDetail />}
                                        />
                                        {/* <Route path="/:handle" element={<RestrictedRoute />} /> */}
                                    </Routes>
                                </main>
                            </>
                        ) : (
                                <>
                                    <Routes>
                                        <Route exact path="/" element={<Login />} />
                                        <Route exact path="/signup" element={<SignUp />} />
                                        {/* <Route path="/:handle" element={<RestrictedRoute />} /> */}


                                    </Routes>
                                </>
                            )}
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
