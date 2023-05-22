import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./features/store";
import {Provider} from "react-redux";
import Header from "./component/ui/Header";
import LoginForm from "./component/ui/LoginForm.tsx";
import SchedulePage from "./component/ui/SchedulePage.tsx";
import ClubDetailPage from "./component/ui/ClubDetailPage";
import LeaguesPage from "./component/ui/LeaguesPage.tsx";
import PlayerForm from "./component/player/PlayerForm.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import UsersPage from "./component/ui/UsersPage.tsx";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import MatchForm from "./component/matches/MatchForm.tsx";

const queryClient = new QueryClient();
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3784c1',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <BrowserRouter>
                            <Header/>
                            <Routes>
                                <Route path={"/authenticate"} element={<LoginForm/>}/>
                                <Route path={"/schedule"} element={<SchedulePage/>}/>
                                <Route path={"/clubs/:id"} element={<ClubDetailPage/>}/>
                                <Route path={"/leagues"} element={<LeaguesPage/>}/>
                                <Route path={"/playerForm/:id"} element={<PlayerForm/>}/>
                                <Route path={"/matchForm/:id"} element={<MatchForm/>}/>
                                <Route path={"/users"} element={<UsersPage/>}/>
                            </Routes>
                        </BrowserRouter>
                    </Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default App
