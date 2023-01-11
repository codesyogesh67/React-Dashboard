import React, { useEffect, useState } from "react";
import StatBox from "./StatBox"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import db from "../../../firebase";
import { selectUserInfo } from "../../../features/userSlice";
import { useSelector } from "react-redux";
import GroupIcon from "@mui/icons-material/Group";
import { selectOrdersList } from "../../../features/orderSlice";
import { getDocs, query, collection, where } from "../../../firebase";
import { tokens } from "../../../theme";
import { Box, useTheme } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';

function Records() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const ordersList = useSelector(selectOrdersList);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const total = [];
        const customers = [];

        async function get_records() {
            if (ordersList?.length > 0) {
                ordersList.map((order) => total.push(order.data.totalPrice));
            }
            setTotalIncome(total.reduce((a, b) => a + b, 0));

            const q = query(collection(db, "users"), where("role", "==", "Customer"))

            const querySnapshot = await getDocs(q);
            if (querySnapshot) {
                customers.push(querySnapshot)
            }


            setTotalCustomers(customers[0].docs.length);
            setLoading(false)
        }
        get_records()
    },
        [ordersList]);
    console.log('orderList', ordersList)

    const pendingOrders = ordersList?.filter(
        (order) => order.data.status === "Pending"
    );


    const data = [
        {
            icon: <GroupIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />,
            value: totalCustomers,
            name: "Total Customers"
        },


        {
            icon: <ShoppingCartOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />,
            value: pendingOrders?.length,
            name: "Total Pending"
        },
        {
            icon: <ListAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />,
            value: ordersList?.length,
            name: "Total Orders"
        },
        {
            icon: <MonetizationOnOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />,
            value: totalIncome,
            name: "Total Income"
        },


    ]

    return (
        <>
            {!loading ?

                (
                    data.map(({ icon, value, name }) =>
                        (
                            <Box
                                key={name}
                                gridColumn="span 3"
                                backgroundColor={colors.primary[400]}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <StatBox
                                    title={value}
                                    subtitle={name}
                                    icon={
                                        icon
                                    }
                                />
                            </Box>
                        )
                    )
                ) : <Skeleton variant="rectangular" />}
        </>
    )
}
export default Records
