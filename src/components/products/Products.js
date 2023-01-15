import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import ProductsList from "./ProductsList";
import AddProducts from "./AddProducts";
import "./Products.css";
import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../features/userSlice";
import CartItems from "./CartItems";
import Header from "../header/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Popover from '@mui/material/Popover';
import { Box, Typography, useTheme } from "@mui/material";
import db, { auth, getDoc, addDoc, where, collection, getDocs, query, doc } from "../../firebase";


function Products() {
    const userInfo = useSelector(selectUserInfo);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [productList, setProductList] = useState([]);

    const [editIdx, setEditIdx] = useState(-1);

    useEffect(() => {


        async function get_products() {
            const ref = collection(db, "products")
            const products = await getDocs(ref)

            setProductList(
                products.docs.map((doc) =>

                    ({
                        id: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                        quantity: doc.data().quantity
                    })

                )
            )



        }
        get_products()

    }, [productList]);





    const addToCart = (productId, name, price) => {
        const orderRef = db
            .collection("users")
            .doc(userInfo?.id)
            .collection("cartItems")
            .where("productId", "==", productId);

        orderRef.get().then((snapshot) => {
            if (snapshot.docs.length < 1) {
                db.collection("users")
                    .doc(userInfo?.id)
                    .collection("cartItems")
                    .add({ productId, name, price, quantity: 1 });
            }
        });
    };
    const startEditing = (index) => {
        setEditIdx(index);
    };

    const handleChange = (value, fieldName, index) => {
        setProductList(
            productList.map((row, j) =>
                j === index
                    ? { ...row, data: { ...row.data, [fieldName]: value } }
                    : row
            )
        );
    };

    const deleteProduct = (productId) => {
        doc(db, "products").where("id", "==", productId).delete()
        // db.collection("products").doc(productId).delete();
    };

    const handleSubmit = (productId, index) => {
        const product = productList[index];

        db.collection("products")
            .doc(productId)
            .update({
                name: product.data.name,
                price: product.data.price,
                quantity: product.data.quantity,
                editedBy: userInfo.first_name + " " + userInfo.last_name,
            });
        setEditIdx(-1);
    };
    const columns = [

        {
            field: "name",
            headerName: "Products",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "price",
            headerName: "Price",
            type: "text",
            headerAlign: "left",
            align: "left",
        },

        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,

        },
    ];

    return (
        <Box m="20px">
            <Header
                title="Products"
            // subtitle="Managing the Users"
            />
            {userInfo?.role === "Manager" ? <AddProducts /> : <CartItems />}

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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={productList}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
}

export default Products;
