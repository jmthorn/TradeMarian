import React from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
