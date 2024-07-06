// import React from 'react';
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from '../Features/login/loginAPI';

type FormValues = {
    email: string;
    password: string;
};

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const onSubmit = async (data: FormValues) => {
        try {
            console.log(data)
            const response = await loginUser(data).unwrap();
            console.log(response);
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card max-w-fit grid grid-cols-1 gap-2">
            <div className="chat chat-end place-items-center">
                <div className="chat-bubble text-4xl ">Login</div>
            </div>
            <div className='grid grid-cols-1 gap-2 place-items-center rounded-box max-w-fit'>
                <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                    <input {...register("email", { required: true })} type="email" className="grow" placeholder="Email" />
                </label>
                {errors.email && <span className="text-red-600">email is required</span>}
                <label className="input input-bordered flex items-center gap-2 w-full max-w-xs ">
                    <input {...register("password", { required: true })} type="password" className="grow" placeholder="Password" />
                </label>
                {errors.password && <span className="text-red-600">password is required</span>}
            </div>
            <button type='submit' className='btn btn-outline w-full btn-info'>Login</button>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-600">Failed to login</p>}
        </form>
    );
}

export default Login;
