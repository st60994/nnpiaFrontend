import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {setLogin} from "../features/login/loginSlice.ts";
import store from "../features/store";
import axios from "axios";


interface FormValues {
    username: string;
    password: string;
}

const resolver = yupResolver(yup.object({
    "username": yup.string()
        .max(128, "The maximum amount of characters for a username has been reached")
        .required("Please input your username"),
    "password": yup.string()
        .min(5)
        .required("Password is required")
}));

const TaskForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver})
    const [fail, setFail] = useState(false);
    const navigate = useNavigate();
    const submitHandle = async (data: FormValues) => {
        console.table(data);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${backendUrl}/authenticate`, data);
            const {jwt} = response.data;
            localStorage.setItem('token', jwt);
            console.log('Token saved in local storage:', jwt);
            store.dispatch(setLogin(jwt));
            navigate('/');
        } catch (error) {
            console.error('Failed to authenticate:', error);
            setFail(true);
        }
    }


    return <>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(submitHandle)}>
            <input {...register("username")}/>
            {errors.username && <p>{errors.username.message}</p>}
            <input type={"password"} {...register("password")}/>
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit">Sign in</button>
        </form>
        {fail && <p>Login not successful! Please check your password and username.</p>}
    </>
}

export default TaskForm;