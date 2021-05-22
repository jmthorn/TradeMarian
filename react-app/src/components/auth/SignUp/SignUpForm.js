import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='signup-page'>
      <div id='signup-container'>
        <div id='signup'>
          <div id='signup-header'>
            <img src={'/images/logo.png'} alt="TradeMarian logo" height='42'/>
            <h3>Make Your Money Move</h3>
            <p>Robinhood lets you invest in companies you love, commission-free.</p>
            <p>Please enter your full legal name. Your legal name should match any form of government ID.</p>
          </div>
          <form onSubmit={onSignUp} id='signup-form'>
            <div className='signup-input'>
              <input
                type="text"
                name="username"
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className='signup-input'>
              <input
                type="text"
                name="email"
                placeholder='Email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className='signup-input'>
              <input
                type="password"
                name="password"
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='signup-input'>
              <input
                type="password"
                name="repeat_password"
                placeholder='Confirm Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type="submit" id='signup-btn'>Sign Up</button>
          </form>
          <div id='fine-print'>
            <p>
              All investments involve risk, including the possible loss of
              principal. Investors should consider their investment objectives
              and risks carefully before investing.
            </p>
            <p>
              Commission-free trading means $0 commission trading on
              self-directed individual cash or margin brokerage accounts that
              trade U.S. listed securities via mobile devices or web. Keep in
              mind, other fees such as trading (non-commission) fees, Gold
              subscription fees, wire transfer fees, and paper statement fees
              may apply to your brokerage account. Please see TradeMarian
              Financial’s fee schedule to learn more.
            </p>
            <p>
              Securities trading offered through TradeMarian Financial LLC.
              Brokerage clearing services offered through TradeMarian Securities,
              LLC. Both are subsidiaries of TradeMarian Markets, Inc.
            </p>
            <p>
              Check the background of TradeMarian Financial LLC and TradeMarian
              Securities, LLC on FINRA’s BrokerCheck.
            </p>
            <p>
              TradeMarian Terms & Conditions  Disclosure Library  Contact Us  FAQ
            </p>
            <p>
              © 2021 TradeMarian. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <div id='signup-misc'>
        <h4>Commission-free trading</h4>
        <p>
          Break free from commission-fees and make unlimited commission-free 
          trades in stocks, funds, and options with TradeMarian Financial. Other 
          fees may apply. View our fee schedule to learn more.
        </p>
        <h4>Account Protection</h4>
        <p>
         TradeMarian Financial is a member of SIPC. Securities in your account 
          protected up to $500,000. For details, please see www.sipc.org.
        </p>
        <h4>Stay on top of your portfolio</h4>
        <p>
          Set up customized news and notifications to stay on top of your 
          assets as casually or as relentlessly as you like. Controlling the 
          flow of info is up to you.
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
