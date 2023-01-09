import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../../../features/userSlice";
import { Link } from "react-router-dom";

import { selectOrdersList, updateOrders } from "../../../features/orderSlice";
import db, { auth, getDoc, addDoc, where, collection, getDocs, query, doc }
    from "../../../firebase";
import AvatarColors from "./AvatarColors"
import { tokens } from "../../../theme";

function Orders() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectOrdersList);
    const dispatch = useDispatch();
    const [ordersList, setOrdersList] = useState([]);


    useEffect(() => {
        if (user) {
            async function get_orders() {
                if (user?.role === "Manager") {
                    const ref = collection(db, "orders")
                    const filteredDocs = await getDocs(ref)


                    // ref.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                    dispatch(
                        updateOrders(
                            filteredDocs.docs.map((doc) => ({
                                id: doc.id,
                                data: doc.data(),
                            }))
                        )
                    );
                    setOrdersList(
                        filteredDocs.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                }
                else {

                    const q = query(collection(db, "orders"), where("customer", "email", "==", "user?.email"))
                    const orderList = getDocs(q)
                    if (orderList) {
                        dispatch(
                            updateOrders(
                                orderList?.map((order) => ({
                                    id: order.id,
                                    data: order.data(),
                                }))
                            )
                        );
                        setOrdersList(
                            orderList?.map((order) => ({
                                id: order.id,
                                data: order.data(),
                            }))
                        );
                    }
                }

            }
            get_orders()
        }
    }, [user]);
    return (
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Recent Transactions
          </Typography>
            </Box>
            {ordersList?.map(
                (
                    {
                        id,
                        data: {
                            customer,
                            list,
                            timestamp,
                            status,
                            totalPrice,
                            totalQuantity,
                            approveBy,
                            approvedTimestamp,
                        },
                    },
                    index
                ) => (
                        <Box
                            key={id}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p="15px"
                        >
                            <Box display="flex" alignItems="center">
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant="h5"
                                    fontWeight="600"
                                    pr="10px"
                                >
                                    <AvatarColors name={customer.first_name.toUpperCase()} />
                                </Typography>
                                <Typography color={colors.grey[100]}>
                                    {customer.first_name} {customer.last_name}

                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}>
                                {new Date(timestamp?.toDate()).toLocaleDateString()}

                            </Box>
                            <Box
                                backgroundColor={colors.greenAccent[500]}
                                p="5px 10px"
                                borderRadius="4px"
                            >
                                {status}
                            </Box>
                        </Box>
                    ))}
        </Box>

    )
}

export default Orders
