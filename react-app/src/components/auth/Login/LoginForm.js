import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

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
      <div className='form-container'>
        <form onSubmit={onLogin} className='login-form'>
          <p>Welcome to TradeMarian</p>
          <div className='form-inputs'>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className='email'>
              <label htmlFor="email">Email or username</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <button type="submit">Sign In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
