// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from '../Features/login/loginAPI';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/forms/Login.module.scss';
import { LoginResponse } from '../Features/login/loginAPI'; // Import the LoginResponse type
import { Navbar } from "../components";

type FormValues = {
    email: string;
    password: string;
};

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FormValues) => {
        try {
            console.log(data);
            const response = await loginUser(data).unwrap() as LoginResponse;
            console.log(response);

            const userRole = response.user.role;
            if (userRole === 'admin') {
                navigate('/admin');
            } else if (userRole === 'user') {
                navigate('/users');
            }
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <>
        <Navbar />
        <div className={styles['login-container']}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles['login-form']}>
                <div className={styles['form-title']}>Login</div>
                <div className={styles['form-group']}>
                    <label>Email</label>
                    <input {...register("email", { required: true })} type="email" />
                    {errors.email && <span className={styles['error']}>Email is required</span>}
                </div>
                <div className={styles['form-group']}>
                    <label>Password</label>
                    <input {...register("password", { required: true })} type="password" />
                    {errors.password && <span className={styles['error']}>Password is required</span>}
                </div>
                <button type='submit' className={styles['submit-btn']}>Login</button>
                {isLoading && <p className={styles['loading']}>Loading...</p>}
                {error && <p className={styles['error-message']}>Failed to login</p>}
            </form>
        </div>
        </>
    );
}

export default Login;
