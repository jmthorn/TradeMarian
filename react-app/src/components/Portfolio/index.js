import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import './portfolio.css';
import { userPortfolio } from "../../store/portfolio"
import Sidebar from './Sidebar'

const Portfolio = () => {

  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const onLoad = async () => {
    const portfolio = await dispatch(userPortfolio())
    // console.log(portfolio)
  }

  onLoad()

  return (
      <>
        <h1>$Portfolio</h1>
        <Sidebar/>
      </>
  )
};

export default Portfolio;
