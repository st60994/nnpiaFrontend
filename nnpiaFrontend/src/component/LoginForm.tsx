import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";

interface FormValues {
    login: string;
    password: string;
}

const resolver = yupResolver(yup.object({
    "login": yup.string()
        .max(128, "The maximum amount of characters for a username has been reached")
        .required("Please input your username"),
    "password": yup.string()
        .min(8)
        .required("Password is required")
}));

const TaskForm = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver})

    const submitHandle = (data: FormValues) => {
        console.table(data);
    }

    return <>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(submitHandle)}>
            <input {...register("login")}/>
            {errors.login && <p>{errors.login.message}</p>}
            <input type={"password"} {...register("password")}/>
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit">Sign in</button>
        </form>
    </>
}

export default TaskForm;