import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {setLogin} from "../../features/login/loginSlice.ts";
import store from "../../features/store";
import axios from "axios";
import {Button, Typography, TextField} from "@mui/material";


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
        <Typography variant='h1' gutterBottom>Sign in</Typography>
        <div>
            <form onSubmit={handleSubmit(submitHandle)}>
                <TextField label="Username" error={!errors} helperText={errors.username && errors.username.message} required{...register("username")}/>

                <TextField label="Password" error= {!errors} type={"password"} helperText= {errors.password && errors.password.message} required{...register("password") }/>

                <Button type="submit" variant='contained'>Sign in</Button>
            </form>
            {fail && <Typography>Login not successful! Please check your password and username.</Typography>}
        </div>
    </>
}

export default TaskForm;