// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from '../Features/login/loginAPI';
import styles from '../styles/forms/Login.module.scss';

type FormValues = {
    email: string;
    password: string;
};

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const onSubmit = async (data: FormValues) => {
        try {
            console.log(data);
            const response = await loginUser(data).unwrap();
            console.log(response);
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
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
    );
}

export default Login;
