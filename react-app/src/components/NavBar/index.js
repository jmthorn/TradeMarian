import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <li>
            <LogoutButton />
      </li>
    );
  } else {
    sessionLinks = (
      <>
        <li className="nav-login">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>      
      </>
    );
  }

  return (
    <nav>
      <ul className="nav-list">
        <li className="nav-home">
          <NavLink to="/" exact={true} activeClassName="active">
            TradeMarian
            {/* <img className="logo" src={} alt="logo"/> */}
          </NavLink>
        </li>
        <li className="nav-search">
          <input type="text" placeholder="Search"/>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;