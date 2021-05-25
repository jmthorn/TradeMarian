import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/session';
// import './DemoButton.css';

function DemoButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(login('demo@aa.io', 'password'));
    history.push('/');
  }

  return (
    <button onClick={handleClick} type='submit' id='demo-btn'>Demo User</button>
  )
}

export default DemoButton;