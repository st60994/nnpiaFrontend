import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./features/store";
import {Provider} from "react-redux";
import Header from "./component/ui/Header";
import LoginForm from "./component/ui/LoginForm.tsx";
import SchedulePage from "./component/ui/SchedulePage.tsx";
import ClubDetailPage from "./component/ui/ClubDetailPage";
import LeaguesPage from "./component/ui/LeaguesPage.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path={"/authenticate"} element={<LoginForm />} />
                        <Route path={"/schedule"} element={<SchedulePage  />}/>
                        <Route path={"/clubs/:id"} element={<ClubDetailPage />} />
                        <Route path={"/leagues"} element={<LeaguesPage />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    )
}

export default App
