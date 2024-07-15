// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from '../Features/login/loginAPI';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/forms/Login.module.scss';
import { Navbar } from "../components";
import loginImage from './bg/signin.svg'; // Corrected import for the image

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
            // console.log(data);
            const response = await loginUser(data).unwrap();
            // console.log(response);

            // Persist the response to local storage
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('token', JSON.stringify(response.token));
            
            // console.log(response.token);

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
            <div className={styles['login-page']}>
                <div className={styles['login-container']}>
                    <div className={styles['login-image']}>
                        <img src={loginImage} alt="Login Illustration" />
                    </div>
                    <div className={styles['login-form-container']}>
                        <form onSubmit={handleSubmit(onSubmit)} className={styles['login-form']}>
                            <h2 className={styles['form-title']}>Sign In</h2>
                            <div className={styles['form-group']}>
                                <label>Username</label>
                                <input {...register("email", { required: true })} type="email" placeholder="Username" />
                                {errors.email && <span className={styles['error']}>Email is required</span>}
                            </div>
                            <div className={styles['form-group']}>
                                <label>Password</label>
                                <input {...register("password", { required: true })} type="password" placeholder="Password" />
                                {errors.password && <span className={styles['error']}>Password is required</span>}
                            </div>
                            <div className={styles['form-options']}>
                                <div>
                                    <input type="checkbox" id="remember-me" />
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>
                                <a href="/forgot-password" className={styles['forgot-password']}>Forgot password?</a>
                            </div>
                            <button type="submit" className={styles['submit-btn']}>SIGN IN</button>
                            {isLoading && <p className={styles['loading']}>Loading...</p>}
                            {error && <p className={styles['error-message']}>Failed to login</p>}
                            <p className={styles['register-link']}>
                                Not registered yet? <a href="/register">Create an Account</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
