import React, { useState } from 'react';
// import { RouteComponentProps } from 'react-router-dom';
import './login.scss';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.svg';
import google from '../../assets/images/google.svg';
import linkedin from '../../assets/images/linkedin.svg';
import { connect } from 'react-redux';
// import { setUserAction } from '../../shared/store/actions/user.actions';
// import { Dispatch } from 'redux';

// interface Props extends RouteComponentProps {
//   setUserType(username: string): void;
// }

const Login = ({ setUserType, history }: any) => {
  const [login, setLogin] = useState(true);
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const signUp = () => {
    setSignUpForm({
      name: '',
      password: '',
      email: '',
    });
  };

  const signIn = () => {
    history.push('/dashboard');
    setUserType(signInForm.email);
    setSignInForm({
      password: '',
      email: '',
    });
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
          <div onClick={() => setLogin(!login)} className="login__welcome-back__main-container__button-container">
            Sign In
          </div>
        </div>
      </div>
      <div className={`login__create-container ${login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
        Create Account
        <div className="login__create-container__social-container">
          <img className="login__create-container__social-container--facebook-icon" src={facebook} alt="" />
          <img className="login__create-container__social-container--google-icon" src={google} alt="" />
          <img className="login__create-container__social-container--linkedin-icon" src={linkedin} alt="" />
        </div>
        <span className="login__create-container--info-text">or use email for your registration</span>
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
      <div className={`login__login-container ${!login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
        <div className="login__login-container__logo-container">
          <img className="login__login-container__logo-container--image" src={logo} alt="Budwriter" />
          Budwriter
        </div>
        <div className="login__login-container__main-container">
          <div className="login__login-container__main-container__social-container">
            <img className="login__login-container__main-container__social-container--facebook-icon" src={facebook} alt="" />
            <img className="login__login-container__main-container__social-container--google-icon" src={google} alt="" />
            <img className="login__login-container__main-container__social-container--linkedin-icon" src={linkedin} alt="" />
          </div>
          <span className="login__login-container__main-container--info-text">or use email for your login</span>
          <div className="login__login-container__main-container__form-container">
            <form className="login__login-container__main-container__form-container__form" onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}>
              <input
                className="login__login-container__main-container__form-container__form--email"
                type="email"
                placeholder="Email"
                name="email"
                value={signInForm.email}
                onChange={handleSignInChange}
                required
              />
              <input
                className="login__login-container__main-container__form-container__form--password"
                type="password"
                placeholder="Password"
                name="password"
                value={signInForm.password}
                onChange={handleSignInChange}
                required
              />
              <button className="login__login-container__main-container__form-container__form--submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
      <div className={`login__hello-container ${!login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
        <div className="login__welcome-back__main-container__text-container">
          <span className="login__welcome-back__main-container__text-container--title">Hello, stranger!</span>
          <span className="login__welcome-back__main-container__text-container--secondary">Enter your personal details and start your own portfolio!</span>
        </div>
        <div onClick={() => setLogin(!login)} className="login__welcome-back__main-container__button-container">
          Sign Up
        </div>
      </div>
    </div>
  );
};

// Uncomment and update the below code as per your Redux setup
// function mapDispatchToProps(dispatch: Dispatch) {
//   return {
//     setUserType: (username: string) =>
//       dispatch(setUserAction({
//           username
//       }))
//   };
// }

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
