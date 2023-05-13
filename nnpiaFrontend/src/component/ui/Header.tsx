import {AppBar, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import store, {RootState} from "../../features/store";
import {setLogin} from "../../features/login/loginSlice.ts";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import './Header.css';

function Header() {
    const isLoggedIn = useSelector((state: RootState) => state.login.value);

    const handleLogout = () => {
        store.dispatch(setLogin(null));
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <SportsSoccerIcon></SportsSoccerIcon>
                </IconButton>
                <Stack direction='row' spacing={2}>
                    <Button color='inherit' component={Link} to={"/schedule"}>
                        <Typography variant="h6">Schedule</Typography>
                    </Button>
                    <Button color='inherit' component={Link} to={"/leagues"}>
                        <Typography variant="h6" sx={{flexGrow: 1}}>Leagues</Typography>
                    </Button>
                </Stack>
                <div style={{marginLeft: "auto"}}>
                    {isLoggedIn ? (
                        <Button
                            variant='contained'
                            onClick={handleLogout}>
                            <Typography variant="h6">Logout</Typography>
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{marginLeft: "auto"}}
                            component={Link}
                            to="/authenticate">
                            <Typography variant="h6">Login</Typography>
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;