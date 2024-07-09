// src/pages/Register.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import styles from '../styles/forms/Register.module.scss';
import { Navbar } from '../components';
import { Toaster, toast } from 'sonner';
import { useRegisterUserMutation } from '../Features/login/loginAPI';

type FormValues = {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();  // Initialize useNavigate

  const onSubmit = async (data: FormValues) => {
    console.log("Submitting data:", data);  // Add this line to log the data

    try {
      await registerUser(data).unwrap();
      toast.success('User registered successfully');
      navigate('/login');  // Navigate to login page after successful registration
    } catch (error: any) {
      console.error("Error registering user:", error);  // Log the error for debugging
      if (error.status === 400) {
        if (error.data?.message === "Email has been used") {
          toast.error('Email has been used. Please try another one.');
        } else {
          toast.error('Email has been used. Please try another one');
        }
      } else {
        toast.error('Error registering user');
      }
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className={styles['register-container']}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles['register-form']}>
          <h2>Register</h2>
          <div className={styles['form-group']}>
            <label>Full Name</label>
            <input {...register('fullName', { required: true })} type="text" />
            {errors.fullName && <span className={styles['error']}>Full Name is required</span>}
          </div>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input {...register('email', { required: true })} type="email" />
            {errors.email && <span className={styles['error']}>Email is required</span>}
          </div>
          <div className={styles['form-group']}>
            <label>Contact Phone</label>
            <input {...register('contactPhone', { required: true })} type="text" />
            {errors.contactPhone && <span className={styles['error']}>Contact Phone is required</span>}
          </div>
          <div className={styles['form-group']}>
            <label>Address</label>
            <input {...register('address', { required: true })} type="text" />
            {errors.address && <span className={styles['error']}>Address is required</span>}
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input {...register('password', { required: true, minLength: 6 })} type="password" />
            {errors.password && <span className={styles['error']}>Password must be at least 6 characters</span>}
          </div>
          <button type='submit' className={styles['submit-btn']}>Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
