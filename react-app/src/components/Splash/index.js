import React from "react";
import { useSelector } from 'react-redux'
import './splash.css';

const Splash = () => {

  const user = useSelector(state => state.session.user)

  return (
      <>
        <h1>Splash</h1>
      </>
  )
};

export default Splash;