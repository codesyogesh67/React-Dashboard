import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const StatBox = ({ title, subtitle, icon }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" m="0 30px">
            <Box>
                <Box display="flex" alignItems="center" alignItems="center" >
                    {icon}
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.greenAccent[500], textAlign: "center" }}
                        ml="20px"

                    >
                        {title}
                    </Typography>
                </Box>

            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                    {subtitle}
                </Typography>

            </Box>
        </Box>
    );
};

export default StatBox;