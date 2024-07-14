import React, { useState } from 'react';
// import '../components/login/login.scss';
// import logo from '../assets/images/logo.png';
// import facebook from '../assets/images/facebook.svg';
// import google from '../assets/images/google.svg';
// import linkedin from '../assets/images/linkedin.svg';
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from '../Features/login/loginAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState(true);
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSignUpChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const signUp = () => {
    setSignUpForm({
      name: '',
      password: '',
      email: '',
    });
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await loginUser(data).unwrap();
      console.log(response);

      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('token', JSON.stringify(response.token));

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
    <div className="login">
      <div className={`login__colored-container ${login ? 'login__colored-container--left' : 'login__colored-container--right'}`}></div>
      <div className={`login__welcome-back ${login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
        <div className="login__welcome-back__logo-container">
          <img className="login__welcome-back__logo-container--image" src={logo} alt="Budwriter" />
          Budwriter
        </div>
        <div className="login__welcome-back__main-container">
          <div className="login__welcome-back__main-container__text-container">
            <span className="login__welcome-back__main-container__text-container--title">Welcome Back!</span>
            <span className="login__welcome-back__main-container__text-container--secondary">To keep sharing your work with us, please log in.</span>
          </div>
          <div onClick={() => setLogin(true)} className="login__welcome-back__main-container__button-container">
            Sign In
          </div>
        </div>
      </div>
      <div className={`login__create-container ${login ? 'login__create-container--inactive' : 'login__create-container--active'}`}>
        <div className="login__create-container__form-header">
          <h2>Create Account</h2>
          <div className="login__create-container__social-container">
            <img className="login__create-container__social-container--facebook-icon" src={facebook} alt="Facebook" />
            <img className="login__create-container__social-container--google-icon" src={google} alt="Google" />
            <img className="login__create-container__social-container--linkedin-icon" src={linkedin} alt="LinkedIn" />
          </div>
          <span className="login__create-container--info-text">or use email for your registration</span>
        </div>
        <div className="login__create-container__form-container">
          <form className="login__create-container__form-container__form" onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}>
            <input
              className="login__create-container__form-container__form--name"
              type="text"
              placeholder="Name"
              name="name"
              value={signUpForm.name}
              onChange={handleSignUpChange}
              required
            />
            <input
              className="login__create-container__form-container__form--email"
              type="email"
              placeholder="Email"
              name="email"
              value={signUpForm.email}
              onChange={handleSignUpChange}
              required
            />
            <input
              className="login__create-container__form-container__form--password"
              type="password"
              placeholder="Password"
              name="password"
              value={signUpForm.password}
              onChange={handleSignUpChange}
              required
            />
            <button className="login__create-container__form-container__form--submit">Sign Up</button>
          </form>
        </div>
      </div>
      <div className={`login__login-container ${!login ? 'login__login-container--inactive' : 'login__login-container--active'}`}>
        <div className="login__login-container__logo-container">
          <img className="login__login-container__logo-container--image" src={logo} alt="Budwriter" />
          Budwriter
        </div>
        <div className="login__login-container__main-container">
          <div className="login__login-container__main-container__social-container">
            <img className="login__login-container__main-container__social-container--facebook-icon" src={facebook} alt="Facebook" />
            <img className="login__login-container__main-container__social-container--google-icon" src={google} alt="Google" />
            <img className="login__login-container__main-container__social-container--linkedin-icon" src={linkedin} alt="LinkedIn" />
          </div>
          <span className="login__login-container__main-container--info-text">or use email for your login</span>
          <div className="login__login-container__main-container__form-container">
            <form className="login__login-container__main-container__form-container__form" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="login__login-container__main-container__form-container__form--email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                required
              />
              {errors.email && <span className="error">Email is required</span>}
              <input
                className="login__login-container__main-container__form-container__form--password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                required
              />
              {errors.password && <span className="error">Password is required</span>}
              <button className="login__login-container__main-container__form-container__form--submit" type="submit">Sign In</button>
              {isLoading && <p className="loading">Loading...</p>}
              {error && <p className="error-message">Failed to login</p>}
            </form>
          </div>
        </div>
      </div>
      <div className={`login__hello-container ${!login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
        <div className="login__welcome-back__main-container__text-container">
          <span className="login__welcome-back__main-container__text-container--title">Hello, stranger!</span>
          <span className="login__welcome-back__main-container__text-container--secondary">Enter your personal details and start your own portfolio!</span>
        </div>
        <div onClick={() => setLogin(false)} className="login__welcome-back__main-container__button-container">
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default Login;
