import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './portfolio.css';
import { userPortfolio } from "../../store/portfolio"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Sidebar from './Sidebar'

const Portfolio = () => {

  const user = useSelector(state => state.session.user)
  const portfolio_data = useSelector(state => state.portfolio.portfolio?.portfolio_data)
  const dispatch = useDispatch()


  useEffect(async() => { 
    const portfolio = await dispatch(userPortfolio())
  }, [])



  return (
      <>
        <h1>$Portfolio</h1>
          <div className="portfolio-container">
              <div>
                  <LineChart width={730} height={250} data={portfolio_data}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <Line type="monotone"  dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false}/>
                      {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" hide={true}/> */}
                      <XAxis dataKey="date"  hide={true}/>
                      <YAxis dataKey="value" domain={['auto', 'auto']} hide={true}/>
                      <Tooltip />
                      {/* <Legend /> */}
                  </LineChart>
              </div>
          </div>
        <Sidebar/>
      </>
  )
};

export default Portfolio;



{/* <div id='stock-container'>
            <LineChart width={730} height={250} data={prices}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis dataKey="close" hide={true} />
                <YAxis domain={['auto', 'auto']} hide={true} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke={lineColor} strokeWidth={1.5} dot={false}/>
            </LineChart>
        </div> */}