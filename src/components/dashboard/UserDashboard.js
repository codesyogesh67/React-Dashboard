import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { tokens } from "../../theme";
import { selectUserInfo } from "../../features/userSlice";
import Orders from "./components/Orders";
import Records from "./components/Records";
import Customers from "./components/Customers";
import { useLocation } from "react-router-dom";
import UserOrderDetail from "../users/UserOrderDetail";

const UserDashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(selectUserInfo);
    const location = useLocation()
    const name = location.state?.name

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title={name} subtitle="Welcome to my dashboard" />
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                mb="20px"
            >
                {/* ROW 1 */}
                <Records />
            </Box>

            {/* ROW 2 */}

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap="20px"
                mb="20px"
            >



                <Box
                    gridColumn="span 8"
                >
                    <UserOrderDetail name={location.state?.name} />
                </Box>



            </Box>


        </Box >

    );
};

export default UserDashboard;