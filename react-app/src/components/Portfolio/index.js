import React from "react";
import { useSelector } from 'react-redux'
import './portfolio.css';

const Portfolio = () => {

  const user = useSelector(state => state.session.user)


  return (
      <>
        <h1>$Portfolio</h1>
      </>
  )
};

export default Portfolio;
