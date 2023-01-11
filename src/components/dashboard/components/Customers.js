import React, { useEffect, useState } from "react";
import { tokens } from "../../../theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import db, { auth, getDoc, addDoc, where, collection, getDocs, query, doc }
    from "../../../firebase";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import AvatarColors from "./AvatarColors"

import { updatePrevUsersList } from "../../../features/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

function Customers() {
    const [customer, setCustomer] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true;
        const findCustomers = async () => {
            if (mounted) {
                const q = query(collection(db, "users"), where("role", "==", "Customer"))
                const filteredDoc = await getDocs(q)
                dispatch(
                    updatePrevUsersList(
                        filteredDoc.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })
                        )))
                setCustomer(filteredDoc.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                )
                );



            }
        }
        findCustomers()

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Box
            width="100%"
            backgroundColor={colors.primary[400]}

        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                colors={colors.grey[100]}
                p="15px"

            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Customers
          </Typography>
            </Box>
            {customer.map((each) => {
                const {
                    id,
                    data: { first_name, last_name, email, role, username },
                } = each;
                const full_name = first_name.charAt(0).toUpperCase() +
                    first_name.slice(1) +
                    " " +
                    last_name.charAt(0).toUpperCase() +
                    last_name.slice(1)

                return (
                    <Box
                        key={id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"

                        p="15px"
                    >
                        <Box display="flex" justifyContent="space-around" alignItems="center">
                            <Typography
                                color={colors.greenAccent[500]}
                                variant="h5"
                                fontWeight="600"
                                pr="10px"
                            >
                                <AvatarColors name={first_name?.toUpperCase()} />

                            </Typography>
                            <Link to={`/dashboard/${full_name}`} state={{ name: full_name, username, email }}>
                                <Typography color={colors.grey[100]} >
                                    {
                                        full_name
                                    }
                                </Typography></Link>

                        </Box>


                    </Box>
                );
            })}
        </Box >

    )
}

export default Customers
