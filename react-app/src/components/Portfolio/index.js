import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import './portfolio.css';
import { userPortfolio } from "../../store/portfolio"
import { LineChart, Line, XAxis, YAxis, Tooltip} from "recharts";
import Sidebar from './Sidebar'
import News from '../News'

const Portfolio = () => {

  const [lineColor, setLineColor] =  useState("")
  const user = useSelector(state => state.session.user)
  const portfolio_data = useSelector(state => state.portfolio?.portfolio?.portfolio_data)
  const totalCost = useSelector(state => state.portfolio?.portfolio?.totalCost)
  const dispatch = useDispatch()
  const [dateRange, setDateRange] = useState(portfolio_data)
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
      if (portfolio_array[0]["value"] > portfolio_array[(portfolio_array.length)-1]["value"]) {
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
    setCurrentPrice((value - totalCost).toFixed(2))
    // condition on state of dateRange
    setCurrentChange( Math.abs( (value - portfolio_data[0].value).toFixed(2) ) )
    // calc percent change
    if (portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value) {
      setCurrentPercentChg( Math.abs(((portfolio_data[0].value - value) / value).toFixed(5)/100))
    } else {
      setCurrentPercentChg( Math.abs( ((value - portfolio_data[0].value) / portfolio_data[0].value).toFixed(5)/100 ))
    }
    //set sign
    if ( dateRange ? dateRange[0]['value'] < dateRange[dateRange.length -1]['value'] : portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value) {
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


  return (
      <>
        <div id="page-container">
          <div id="portfolio-container">
            <div id="ticker">
              <h1 id="">${currentPrice ? currentPrice : ((portfolio_data[(portfolio_data?.length)-1].value) - totalCost).toFixed(2)}</h1>
            </div>
            <div id='ticker-change'>
              <p>{`${sign ? sign : portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value ? '+' : '-'}$${ currentChange ? currentChange : Math.abs( (portfolio_data[(portfolio_data?.length) -1].value - portfolio_data[0].value).toFixed(2) ) }
                (${sign ? sign : portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value ? '+' : '-'}${currentPercentChg ? currentPercentChg : Math.abs( (((portfolio_data[0].value - portfolio_data[(portfolio_data?.length) -1].value)/ portfolio_data[(portfolio_data?.length) -1].value) * 100).toFixed(5) )  }%)`}
                { past ? past : 'Past Year'}
              </p>
            </div>

              <div id="portfolio-graph-container">
                  <div>
                      <LineChart width={730} height={250} data={dateRange ? dateRange : portfolio_data}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onMouseMove={(e) => handleClick(e.activePayload ? (e?.activePayload[0].payload.value) : (portfolio_data[(portfolio_data.length)-1].value) )}>
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
