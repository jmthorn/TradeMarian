import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../../store/session";
import DemoButton from "../DemoButton";
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const navSignUp = (e) => {
    e.preventDefault();
    history.push('/sign-up');
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login-page'>
      <div className='login-img'>
        <img src={'/images/Log_in_img.jpg'} alt=""/>
      </div>
      <div className='login-form-container'>
        <form onSubmit={onLogin} className='login-form'>
          <h3>Welcome to TradeMarian</h3>
          <div className='login-form-details'>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className='login-form-inputs'>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login-form-inputs'>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div id='redirect-signup'>
              <p>
                Don't have an account?
              <a href='/sign-up' onClick={navSignUp}> Sign up here</a>
              </p>
            </div>
          </div>
        <button type="submit" id='signin-btn'>Sign In</button>
        <DemoButton />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
