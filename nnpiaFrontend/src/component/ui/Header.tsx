import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import store, {RootState} from "../../features/store";
import {setLogin} from "../../features/login/loginSlice.ts";
import './Header.css';

function Header() {
    const isLoggedIn = useSelector((state: RootState) => state.login.value);

    const handleLogout = () => {
        store.dispatch(setLogin(null));
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Link to="/schedule">Schedule</Link>
                    <Link to="/clubs">Clubs</Link>
                    <Link to="/leagues">Leagues</Link>
                    <Link to="/players">Players</Link>
                </Typography>
                    <div style={{marginLeft: "auto"}}>
                        {isLoggedIn ? (
                            <Button
                                variant="contained"
                                onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                sx={{marginLeft: "auto"}}
                                component={Link}
                                to="/authenticate">
                                Login
                            </Button>
                        )}
                    </div>

            </Toolbar>
        </AppBar>
    );
}

export default Header;