import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from "./features/store";
import {Provider} from "react-redux";
import Header from "./component/ui/Header";
import LoginForm from "./component/LoginForm";
import MatchList from "./component/MatchList";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path={"/authenticate"} element={<LoginForm/>}/>
                        <Route path={"/matches"} element={<MatchList/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    )
}

export default App
