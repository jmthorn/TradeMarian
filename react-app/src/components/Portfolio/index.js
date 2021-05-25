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


  useEffect(async() => {
    const portfolio = await dispatch(userPortfolio())
  }, [])



  useEffect(async()=> {
    const portfolio_array = await dateRange;
    console.log(portfolio_array)
    if(portfolio_array){
      if (portfolio_array[0].value > portfolio_array[(portfolio_array.length)-1].value) {
        setLineColor("#dc436f"); //pink
      } else {
        setLineColor("#97ef0c"); //green
      }
    }

  }, [portfolio_data, lineColor, dateRange])


  if(!portfolio_data) return null

  const dateFunc = (date) => {
    if(date == '1Y') {
      setDateRange(portfolio_data)
    } else if (date == '6m') {
      setDateRange(portfolio_data.slice(0, portfolio_data.length/2))
    } else if (date == '1m') {
      setDateRange(portfolio_data.slice(0, portfolio_data.length/12))
    }
  }


  return (
      <>
        <h1>$Portfolio</h1>
          <div className="portfolio-container">
              <div>
                  <LineChart width={730} height={250} data={dateRange}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <Line type="monotone"  dataKey="value" stroke={lineColor} strokeWidth={2} dot={false}/>
                      {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" hide={true}/> */}
                      <XAxis dataKey="date"  hide={true}/>
                      <YAxis dataKey="value" domain={['auto', 'auto']} hide={true}/>
                      <Tooltip />
                      {/* <Legend /> */}
                  </LineChart>
              </div>
          </div>
          <div>
            <button type='button' value='1m' onClick={(e)=> dateFunc(e.target.value)}>1m</button>
          </div>
          <div>
            <button type='button' value='6m' onClick={(e)=> dateFunc(e.target.value)}>6m</button>
          </div>
          <div>
            <button type='button' value='1Y' onClick={(e)=> dateFunc(e.target.value)}>1Y</button>
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
