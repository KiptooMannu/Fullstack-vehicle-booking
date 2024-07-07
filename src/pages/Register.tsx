// src/pages/Register.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/forms/Register.module.scss';
import { Navbar } from '../components';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <>
    <Navbar />
    <div className={styles['register-container']}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['register-form']}>
        <h2>Register</h2>
        <div className={styles['form-group']}>
          <label>Username</label>
          <input {...register('username', { required: true })} type="text" />
          {errors.username && <span className={styles['error']}>Username is required</span>}
        </div>
        <div className={styles['form-group']}>
          <label>Email</label>
          <input {...register('email', { required: true })} type="email" />
          {errors.email && <span className={styles['error']}>Email is required</span>}
        </div>
        <div className={styles['form-group']}>
          <label>Password</label>
          <input {...register('password', { required: true })} type="password" />
          {errors.password && <span className={styles['error']}>Password is required</span>}
        </div>
        <button type='submit' className={styles['submit-btn']}>Register</button>
      </form>
    </div>
    </>
  );
};

export default Register;
