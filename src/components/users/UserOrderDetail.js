import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import db, { auth, getDoc, addDoc, where, collection, getDocs, query, doc }
    from "../../firebase";
import { tokens } from "../../theme";
import Header from "../header/Header";
import { DataGrid } from '@mui/x-data-grid'
// import {

//     DataGridPro,
//     GridColumns,
//     GridFilterModel,
//     GridLinkOperator,
//     GridRowsProp,
//     DataGridProProps,
// } from '@mui/x-data-grid-pro';
import { useLocation } from 'react-router-dom';



function UserOrderDetail() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [userOrderList, setUserOrderList] = useState([])
    const location = useLocation()
    const { name, email } = location.state




    useEffect(() => {



        async function get_user_orders() {

            const ref = query(collection(db, "orders"), where("customer.email", "==", email))
            const data = await getDocs(ref)




            setUserOrderList(
                data.docs.map((order) => ({
                    id: order.id,
                    price: order.data().totalPrice,
                    quantity: order.data().totalQuantity,
                    status: order.data().status,
                    list: order.list,
                    date: typeof order.data().timestamp.toDate === "function"
                        ? new Date(order.data().timestamp.toDate()).toLocaleDateString()
                        : new Date(order.data().timestamp.seconds * 1000).toLocaleDateString()
                }

                )))


        }
        get_user_orders()


    }, []);


    const columns = [
        { field: "id", headerName: "ID" },

        {
            field: "date",
            headerName: "Date Created",
            flex: 1,

        },
        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
            cellClassName: "date-column--cell",
        },
        {
            field: "price",
            headerName: "Amount",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },


    ];
    return (
        <Box m="20px">
            <Header title="Order Details" subtitle="List of Invoice Balances" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={userOrderList} columns={columns} />
            </Box>
        </Box>
    )
}

export default UserOrderDetail
