import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./features/store";
import {Provider} from "react-redux";
import Header from "./component/ui/Header";
import LoginForm from "./component/LoginForm";
import SchedulePage from "./component/ui/SchedulePage.tsx";
import ClubInfo from "./component/ClubInfo";
import ClubDetailPage from "./component/ui/ClubDetailPage";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path={"/authenticate"} element={<LoginForm/>}/>
                        <Route path={"/schedule"} element={<SchedulePage/>}/>
                        <Route path={"/clubs/:id"} element={<ClubDetailPage/>}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    )
}

export default App
