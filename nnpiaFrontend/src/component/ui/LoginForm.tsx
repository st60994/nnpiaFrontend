import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {setLogin} from "../../features/login/loginSlice.ts";
import store from "../../features/store";
import axios from "axios";
import {Button, Typography, TextField, Paper, Grid, Stack} from "@mui/material";

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
    const [isLoginForm, setIsLoginForm] = useState(true);
    const navigate = useNavigate();
    const submitHandle = async (data: FormValues) => {
        if (!isLoginForm) {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            await axios.post(`${backendUrl}/register`
                , {
                    username: data.username,
                    password: data.password
                }).catch(function (error) {
                console.log(error);
            });
        }
        console.table(data);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${backendUrl}/authenticate`, data);
            const {jwt, role} = response.data;
            console.log("DATA", response.data);
            localStorage.setItem('token', jwt);
            localStorage.setItem('role', role);
            console.log('Token saved in local storage:', jwt);
            store.dispatch(setLogin(jwt));
            navigate('/schedule');
        } catch (error) {
            console.error('Failed to authenticate:', error);
            setFail(true);
        }
    }

    const paperStyle = {padding: 20, width: 280, height: '70vh', margin: "20px auto"};
    const titleText = isLoginForm ? "Sign in" : "Register";
    const linkText = isLoginForm ? "Don't have an account?" : "Already have an account?";
    const buttonText = isLoginForm ? "Login" : "Create an account"
    return <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Typography variant='h2' align="center" gutterBottom>{titleText} </Typography>
            <form onSubmit={handleSubmit(submitHandle)}>
                <Stack spacing={5}>
                    <Stack direction="column" spacing={2}>
                        <TextField label="Username" error={!errors}
                                   helperText={errors.username && errors.username.message}
                                   fullWidth
                                   required{...register("username")}/>

                        <TextField label="Password" error={!errors} type={"password"} fullWidth
                                   helperText={errors.password && errors.password.message}
                                   required{...register("password")}/>
                        <Button size="small" style={{alignSelf: 'flex-start'}}
                                onClick={() => setIsLoginForm(!isLoginForm)}>
                            {linkText}
                        </Button>
                    </Stack>
                    <Button type="submit" variant='contained' fullWidth>{buttonText}</Button>

                </Stack>


            </form>
            {fail && <Typography>Login not successful! Please check your password and username.</Typography>}

        </Paper>
    </Grid>
}

export default TaskForm;