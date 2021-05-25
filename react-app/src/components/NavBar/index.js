import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <span className="nav-options">
        {/* <li id="nav-home">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li> */}
        <li id="nav-portfolio">
          <NavLink to="/" exact={true}>
            Portfolio
          </NavLink>
        </li>
        <li id="nav-logout">
          <LogoutButton />
        </li>
      </span>
    );
  } else {
    sessionLinks = (
      <span className="nav-options">
        <li id="nav-login">
          <NavLink to="/login" exact={true} >
            Log In
          </NavLink>
        </li>
        <li id="nav-signup">
          <NavLink to="/sign-up" exact={true} >
            Sign Up
          </NavLink>
        </li>
      </span>
    );
  }

  return (
    <nav>
      <ul id="nav-list">
        <li id="nav-home">
          <NavLink to="/" exact={true}>
            <img className="logo" src={'/images/logo.png'} alt="logo" />
          </NavLink>
        </li>
        <li id="nav-search">
          <input type="text" placeholder="Search" />
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;