import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../header/Header";

import { Box, Typography, useTheme } from "@mui/material";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPrevUsersList, selectFilteredList } from "../../features/userSlice";
import { selectFilterStatus } from "../../features/extraSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [list, setList] = useState([]);

    const data = useSelector(selectPrevUsersList);
    const filteredList = useSelector(selectFilteredList);
    const filterStatus = useSelector(selectFilterStatus);
    const showName = () => { console.log("hello") }
    const navigate = useNavigate()

    useEffect(() => {
        if (filterStatus) {
            setList(filteredList);
        } else {

            setList(data.map(({ id, data: { first_name, last_name, email, username, role } }) => ({
                id,
                name: first_name + " " + last_name,
                email, username, role
            })))


        }
    }, [filteredList]);
    const columns = [

        {
            field: "action",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => {

                return (
                    <Link to={`/dashboard/${params.row.name}`} state={{ name: params.row.name, username: params.row.username, email: params.row.email }}>
                        <Typography color={colors.grey[100]} >
                            {
                                params.row.name
                            }
                        </Typography></Link>
                )

            }

        },
        {
            field: "username",
            headerName: "Username",
            type: "text",
            headerAlign: "left",
            align: "left",
        },

        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,

        },
    ];

    return (
        <Box m="20px">
            <Header
                title="Users"
                subtitle="Managing the Users"
            />
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
                    rows={list}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
};

export default Users;