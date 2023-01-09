import React, { useEffect, useState } from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    Avatar,
} from "@mui/material";
import "./Orders.css";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserInfo } from "../../features/userSlice";
import { selectOrdersList, updateOrders } from "../../features/orderSlice";
import db, { collection, getDocs, query, where, deleteDoc, getDoc, doc, addDoc, updateDoc } from "../../firebase";
import AvatarColors from "../dashboard/components/AvatarColors";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
    container: {
        maxHeight: 440,
        padding: 10,
    },
    tablerow: {
        '&:hover': {
            background: "rgb(235, 235, 235)",
        }
    },
    tableHead: {
        background: "rgb(235, 235, 235)",
    }
});

function Orders() {
    const classes = useStyles();
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
                        data: doc.data(),
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


    return (
        <div className="orders">
            <div className="orders__container">

                {selected?.length < 1 ? (
                    <p className="orders__title">Orders</p>
                ) : (
                        <div className="orders__selected">
                            <p>
                                {selected?.length} {selected?.length === 1 ? "item" : "items"}{" "}
              selected
            </p>
                            <DeleteIcon className="orders__orderDelete" onClick={deleteOrder} />
                        </div>
                    )}
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">
                                    Order                                </TableCell>
                                <TableCell align="center">Date </TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Status</TableCell>

                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
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
                                ) => {

                                    const isItemSelected = isSelected(id);

                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow key={id}
                                            hover
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            selected={isItemSelected}
                                            tabIndex={-1}>
                                            <TableCell align="center">
                                                {user?.role === "Manager" && (
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        onClick={(event) =>
                                                            user?.role === "Manager"
                                                                ? handleClick(event, id)
                                                                : null
                                                        }
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell align="center" id={labelId}>
                                                {" "}
                                                <Link
                                                    to={{
                                                        pathname: `/order/${id}`,
                                                        state: {
                                                            list,
                                                            status,
                                                            totalPrice,
                                                            totalQuantity,
                                                            timestamp,
                                                            id,
                                                            approveBy,
                                                            approvedTimestamp,
                                                        },
                                                    }}
                                                >
                                                    {user?.role === "Manager" ? customer.first_name : id}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="center">
                                                {new Date(timestamp?.toDate()).toLocaleDateString()}
                                            </TableCell>

                                            <TableCell align="center">${totalPrice}</TableCell>
                                            <TableCell
                                                align="center"
                                                className={
                                                    status === "Processing"
                                                        ? "orders__processing"
                                                        : "orders__processed"
                                                }
                                            >
                                                <span
                                                    className="orders__status"
                                                    onClick={() => changeOrderStatus(id, status)}
                                                >
                                                    {status}</span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default Orders;
