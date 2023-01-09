import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../header/Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPrevUsersList, selectFilteredList } from "../../features/userSlice";
import { selectFilterStatus } from "../../features/extraSlice";
import { render } from "react-dom";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [list, setList] = useState([]);

    const data = useSelector(selectPrevUsersList);
    const filteredList = useSelector(selectFilteredList);
    const filterStatus = useSelector(selectFilterStatus);

    useEffect(() => {
        if (filterStatus) {
            setList(filteredList);
        } else {
            console.log("data", data)
            setList(data.map(({ id, data: { first_name, last_name, email, username, role } }) => ({
                id,
                name: first_name + " " + last_name,
                email, username, role
            })))


        }
    }, [filteredList]);
    const columns = [

        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
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

    console.log("lilsts", list)

    return (
        <Box m="20px">
            <Header title="Users" subtitle="Managing the Users" />
            <Box
                m="40px 0 0 0"
                height="75vh"
            // sx={{
            //     "& .MuiDataGrid-root": {
            //         border: "none",
            //     },
            //     "& .MuiDataGrid-cell": {
            //         borderBottom: "none",
            //     },
            //     "& .name-column--cell": {
            //         color: colors.greenAccent[300],
            //     },
            //     "& .MuiDataGrid-columnHeaders": {
            //         backgroundColor: colors.blueAccent[700],
            //         borderBottom: "none",
            //     },
            //     "& .MuiDataGrid-virtualScroller": {
            //         backgroundColor: colors.primary[400],
            //     },
            //     "& .MuiDataGrid-footerContainer": {
            //         borderTop: "none",
            //         backgroundColor: colors.blueAccent[700],
            //     },
            //     "& .MuiCheckbox-root": {
            //         color: `${colors.greenAccent[200]} !important`,
            //     },
            // }}
            >
                <DataGrid rows={list} columns={columns} />
            </Box>
        </Box>
    );
};

export default Users;