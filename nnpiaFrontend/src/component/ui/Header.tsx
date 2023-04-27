import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useGradientBtnStyles} from '@mui-treasury/styles/button/gradient';
import {Link} from "react-router-dom";

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Link to="/matches">Schedule</Link>
                    <Link to="/clubs">Clubs</Link>
                    <Link to="/leagues">Leagues</Link>
                    <Link to="/players">Players</Link>
                    <Button variant="contained" sx={{marginLeft: "auto"}} component={Link} to="/authenticate">
                        Login
                    </Button>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;