import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './portfolio.css';
import { userPortfolio } from "../../store/portfolio"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Sidebar from './Sidebar'

const Portfolio = () => {

  const [lineColor, setLineColor] =  useState("")
  const user = useSelector(state => state.session.user)
  const portfolio_data = useSelector(state => state.portfolio?.portfolio?.portfolio_data)
  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useState(portfolio_data)
  const [currentPrice, setCurrentPrice] = useState(portfolio_data ? portfolio_data[(portfolio_data?.length)-1].value : 21541.08)

  useEffect(async() => {
    const portfolio = await dispatch(userPortfolio())
  }, [])



  useEffect(async()=> {
    const portfolio_array = await dateRange ? dateRange : portfolio_data;
    console.log(portfolio_array)
    if(portfolio_array){
      if (portfolio_array[0].value > portfolio_array[(portfolio_array.length)-1].value) {
        setLineColor("#dc436f"); //pink
      } else {
        setLineColor("#97ef0c"); //green
      }
    }

  }, [portfolio_data, lineColor])



  if(!portfolio_data) return null

  const dateFunc = (date) => {
    if(date == '1Y') {
      setDateRange(portfolio_data)
    } else if (date == '6m') {
      setDateRange(portfolio_data.slice(0, portfolio_data.length/2))
    } else if (date == '1m') {
      setDateRange(portfolio_data.slice(0, portfolio_data.length/12))
    } else if (date == '3m') {
      setDateRange(portfolio_data.slice(0, portfolio_data.length/4))
    }
  }

  const handleClick = (value) => {
    setCurrentPrice(Math.round(value * 100) / 100)
  }

  return (
      <>
        <div id="page-container">
          <div id="portfolio-container">
            <div id="ticker">
              <h1 id="">${currentPrice}</h1>
            </div>
              <div id="portfolio-graph-container">
                  <div>
                      <LineChart width={730} height={250} data={dateRange ? dateRange : portfolio_data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onMouseMove={(e) => handleClick(e.activePayload ? e?.activePayload[0].payload.value : portfolio_data[(portfolio_data.length)-1].value)}>
                          <Line type="monotone"  dataKey="value" stroke={lineColor} strokeWidth={2} dot={false} />
                          {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" hide={true}/> */}
                          <XAxis dataKey="date"  hide={true}/>
                          <YAxis dataKey="value" domain={['auto', 'auto']} hide={true}/>
                          <Tooltip />
                          {/* <Legend /> */}
                      </LineChart>
                  </div>
              </div>

              <div id="button-container">
                <div>
                  <button type='button' value='1m' onClick={(e)=> dateFunc(e.target.value)}>1M</button>
                </div>
                <div>
                  <button type='button' value='3m' onClick={(e)=> dateFunc(e.target.value)}>3M</button>
                </div>
                <div>
                  <button type='button' value='6m' onClick={(e)=> dateFunc(e.target.value)}>6M</button>
                </div>
                <div>
                  <button type='button' value='1Y' onClick={(e)=> dateFunc(e.target.value)} onLoad={dateFunc(portfolio_data)}>1Y</button>
                </div>
              </div>
              <span className="portfolio-line"></span>
              <div className='buying-power'>
                <div className='buying-power_title'>
                  <p>Buying Power</p>
                </div>
                <div className='buying-power_amount'>
                  <p>{`$${user.buying_power}`}</p>
                </div>
              </div>
              <span className="portfolio-line"></span>

          </div>
          <Sidebar/>

        </div>

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
