import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { tokens } from "../../theme";
import { selectUserInfo } from "../../features/userSlice";
import Orders from "./components/Orders";
import Records from "./components/Records";
import Customers from "./components/Customers";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(selectUserInfo);

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fit,minmax(150px,1fr))"
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

                sx={{
                    gridTemplateColumns: {

                        xs: "repeat(auto-fit, minmax(300px,1fr))",

                        md: "250px 1fr"
                    }
                }}


                placedItems="center"
                gap="20px"
                mb="20px"

            >

                <Box

                    display="flex"
                    justifyContent="space-between"
                >
                    {user?.role === "Manager" && (
                        <Customers />
                    )}
                </Box>


                <Box
                    maxWidth="600px"
                >
                    <Orders />
                </Box>



            </Box>


        </Box >

    );
};

export default Dashboard;