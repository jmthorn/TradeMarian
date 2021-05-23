import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/session';
// import './DemoButton.css';

function DemoButton() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login('demo@aa.io', 'password'));
    history.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className='demo'>
      <button type='submit' id='demo-btn'>Demo User</button>
    </form>
  )
}

export default DemoButton;