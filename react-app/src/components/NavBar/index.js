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
      <>
        <li id="nav-home">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li id="nav-portfolio">
          <NavLink to="/" exact={true} activeClassName="active">
            Portfolio
          </NavLink>
        </li>
      <li id="nav-logout">
            <LogoutButton />
      </li>
    </>
    );
  } else {
    sessionLinks = (
      <>
        <li id="nav-login">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li id="nav-signup">
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>      
      </>
    );
  }

  return (
    <nav>
      <ul id="nav-list">
        <li id="nav-home">
          <NavLink to="/" exact={true} activeClassName="active">
            TradeMarian
            {/* TODO: ADD LOGO: */}
            {/* <img className="logo" src={} alt="logo"/> */}
          </NavLink>
        </li>
        <li id="nav-search">
          <input type="text" placeholder="Search"/>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;