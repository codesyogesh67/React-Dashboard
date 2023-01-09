import React, { useEffect, useState } from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { selectOrdersList, updateOrders } from "../../features/orderSlice";
import db, { collection, getDocs, query, where, deleteDoc, getDoc, doc, addDoc, updateDoc } from "../../firebase";
import { selectUserInfo } from "../../features/userSlice";

import { tokens } from "../../theme";
import Header from "../header/Header";

const Orders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selected, setSelected] = useState([]);

    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectOrdersList);
    const dispatch = useDispatch();
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        async function get_orders() {


            if (user?.role === "Manager") {
                const ref = collection(db, "orders")
                const filteredOrders = await getDocs(ref)

                // ref.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                dispatch(
                    updateOrders(
                        filteredOrders.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    )
                );
                setOrdersList(
                    filteredOrders.docs.map((doc) => ({
                        id: doc.id,
                        date: new Date(doc.data().date?.toDate()).toLocaleDateString(),
                        amount: doc.data().totalPrice,
                        status: doc.data().status
                    }))
                );

            } else {
                const ref = query(collection(db, "orders"), where("customer", "email", "==", "user?.email"))
                const orderList = getDocs(ref)
                if (doc) {
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
    }, [user]);
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };
    const changeOrderStatus = (id, status) => {
        if (status === "Processing") {

            db.collection("orders")
                .doc(id)
                .update({
                    status: "Approved",
                    // approvedTimestamp: db.FieldValue.serverTimestamp(),
                    approveBy: user.role === "Manager" ? "Manager" : user?.email,
                });
        } else {
            const q = collection(db, "orders")
            const docRef = updateDoc(q, { status: "Processing", })
            // db.collection("orders").doc(id).update({
            //     status: "Processing",
            // });
        }
    }

    const deleteOrder = () => {
        selected.map(async (id) => {
            await deleteDoc(doc(db, "orders", "id"))
            // db.collection("orders").doc(id).delete();
        });
        setSelected([]);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    console.log(ordersList)

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            cellClassName: "date-column--cell",
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,

        }

    ];

    return (
        <Box m="20px">
            <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
                <DataGrid checkboxSelection rows={ordersList} columns={columns} />
            </Box>
        </Box>
    );
};

export default Orders;