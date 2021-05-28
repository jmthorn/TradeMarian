import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './portfolio.css';
import { userPortfolio } from "../../store/portfolio"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Sidebar from './Sidebar'
import News from '../News'

const Portfolio = () => {

  const [lineColor, setLineColor] =  useState("")
  const user = useSelector(state => state.session.user)
  const portfolio_data = useSelector(state => state.portfolio?.portfolio?.portfolio_data)
  const totalCost = useSelector(state => state.portfolio?.portfolio?.totalCost)
  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useState(portfolio_data)
  // const [currentPrice, setCurrentPrice] = useState(portfolio_data ? portfolio_data[(portfolio_data?.length)-1].value : 21541.08)
  const [currentPrice, setCurrentPrice] = useState('')
  const [currentChange, setCurrentChange] = useState('')
  const [currentPercentChg, setCurrentPercentChg] = useState('')
  const [sign, setSign] = useState('')
  const [timeInterval, setTimeInterval] = useState('')
  const [past, setPast] = useState('')

  useEffect(async() => {
    const portfolio = await dispatch(userPortfolio())
  }, [])


  useEffect(()=> {
    const portfolio_array =  dateRange ? dateRange : portfolio_data;
    if(portfolio_array){
      if ((portfolio_data[0] ? portfolio_array[0]["value"] : 0) > (portfolio_data[0] ? portfolio_array[(portfolio_array.length)-1]["value"] : 0)) {
        setLineColor("#dc436f"); //pink
      } else {
        setLineColor("#97ef0c"); //green
      }
    }

  }, [portfolio_data, lineColor, dateRange])


  if(!portfolio_data) return null

  const dateFunc = (date) => {
    if(date == '1Y') {
      setTimeInterval('1Y')
      setDateRange(portfolio_data)
    } else if (date == '6m') {
      setTimeInterval('6m')
      setDateRange(portfolio_data.slice(portfolio_data.length/2))
    } else if (date == '1m') {
      setTimeInterval('1m')
      setDateRange(portfolio_data.slice((portfolio_data.length/12)* 11))
    } else if (date == '3m') {
      setTimeInterval('3m')
      setDateRange(portfolio_data.slice((portfolio_data.length/4) * 3))
    }
  }

  const handleClick = (value) => {
    setCurrentPrice(Math.round((value - totalCost) * 100) / 100)
    // condition on state of dateRange
    setCurrentChange(Math.abs(Math.round((value - portfolio_data[0].value)*100)) /100)
    // calc percent change
    if (portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value) {
      setCurrentPercentChg( Math.abs(Math.round((((portfolio_data[0].value - value) / value)*100) *100)) /100)
    } else {
      setCurrentPercentChg( Math.abs(Math.round((((value - portfolio_data[0].value) / portfolio_data[0].value)*100) *100)) /100 )
    }
    //set sign
    if (portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value) {
      setSign('+')
    } else {
      setSign('-')
    }
    //set "Past"
    if (timeInterval == '1m') {
      setPast('Past Month')
    } else if (timeInterval == '3m') {
      setPast('Past 3 Months')
    } else if (timeInterval == '6m') {
      setPast('Past 6 Months')
    } else if (timeInterval == '1Y') {
      setPast('Past Year')
    }
  }


  const stockTitle = () => { 
    if (portfolio_data[0]) { 
      return (
        <>
            <div id="ticker">
              <h1 id="">${currentPrice ? currentPrice : Math.round((( portfolio_data[(portfolio_data?.length)-1].value - totalCost)*100)/100)}</h1>
            </div>
            <div id='ticker-change'>
              <p>{`${sign ? sign : portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value? '+' : '-'}$${ currentChange ? currentChange : Math.abs(Math.round((portfolio_data[(portfolio_data?.length) -1].value  -  portfolio_data[0].value )) * 100) /100 }
                (${sign ? sign :  portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value  ? '+' : '-'}${currentPercentChg ? currentPercentChg : Math.abs(Math.round(((((portfolio_data[0].value - portfolio_data[(portfolio_data?.length) -1].value )/  portfolio_data[(portfolio_data?.length) -1].value ) * 100) * 100) /100))  }%)`}
                { past ? past : 'Past Year'}
              </p>
            </div>
        </>
      )
    }
  }


  return (
      <>
        <div id="page-container">
          <div id="portfolio-container">
            {stockTitle()}
              <div id="portfolio-graph-container">
                  <div>
                      <LineChart width={730} height={250} data={dateRange ? dateRange : portfolio_data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onMouseMove={(e) => handleClick(e.activePayload ? (portfolio_data[0] ? e?.activePayload[0].payload.value : 0) : (portfolio_data[0] ? portfolio_data[(portfolio_data.length)-1].value : 0))}>
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
            <div className='news-container'>
              <News />
            </div>
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
