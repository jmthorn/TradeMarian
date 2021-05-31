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
  const[yearColor, setYearColor] = useState("#97ef0c")
  const[oneMonthColor, setOneMonthColor] = useState('#353535')
  const[threeMonthColor, setThreeMonthColor] = useState('#353535')
  const[sixMonthColor, setSixMonthColor] = useState('#353535')

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

  useEffect(() => {

    if (timeInterval === '1Y') {
        setYearColor(lineColor)
        setOneMonthColor("#353535")
        setThreeMonthColor("#353535")
        setSixMonthColor("#353535")
    } else if (timeInterval === '6m') {
        setYearColor("#353535")
        setOneMonthColor("#353535")
        setThreeMonthColor("#353535")
        setSixMonthColor(lineColor)
    } else if (timeInterval === '3m') {
        setYearColor("#353535")
        setOneMonthColor("#353535")
        setThreeMonthColor(lineColor)
        setSixMonthColor("#353535")
    } else if (timeInterval === '1m') {
        setYearColor("#353535")
        setOneMonthColor(lineColor)
        setThreeMonthColor("#353535")
        setSixMonthColor("#353535")
    }

}, [timeInterval, portfolio_data, lineColor, yearColor, oneMonthColor, threeMonthColor, sixMonthColor])

  if(!portfolio_data) return null

  const dateFunc = (date) => {
    if(date == '1Y') {
      setPast('Past Year')
      setTimeInterval('1Y')
      setDateRange(portfolio_data)
    } else if (date == '6m') {
      setPast('Past 6 Months')
      setTimeInterval('6m')
      setDateRange(portfolio_data.slice(portfolio_data.length/2))
    } else if (date == '1m') {
      setPast('Past Month')
      setTimeInterval('1m')
      setDateRange(portfolio_data.slice((portfolio_data.length/12)* 11))
    } else if (date == '3m') {
      setPast('Past 3 Months')
      setTimeInterval('3m')
      setDateRange(portfolio_data.slice((portfolio_data.length/4) * 3))
    }

  }

  const handleClick = (value) => {
    if (!portfolio_data[0]) {
      return
    }
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

  }


  const stockTitle = () => {
    if (portfolio_data[0]) {
      return (
        <>
            <div id="ticker">
              <h1 id="">${currentPrice ? currentPrice : ((portfolio_data[(portfolio_data?.length)-1].value) - totalCost).toFixed(2)}</h1>
            </div>
            <div id='ticker-change'>
              <p>{`${sign ? sign : portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value ? '+' : '-'}$${ currentChange ? currentChange.toFixed(2) : Math.abs( (portfolio_data[(portfolio_data?.length) -1].value - portfolio_data[0].value).toFixed(2) ) }
                (${sign ? sign : portfolio_data[(portfolio_data?.length) -1].value > portfolio_data[0].value ? '+' : '-'}${currentPercentChg ? currentPercentChg.toFixed(5) : Math.abs( (((portfolio_data[0].value - portfolio_data[(portfolio_data?.length) -1].value)/ portfolio_data[(portfolio_data?.length) -1].value) * 100).toFixed(5) )  }%)`}
                { past ? past : 'Past Year'}
              </p>
            </div>
        </>
      )
    } else {
      return (
        <>
            <div id="ticker">
              <h1 id="">You have no stocks!</h1>
            </div>
            <div id='ticker-change'>
              <p>Get started by using the search bar to find a company whose stocks you'd like to buy</p>
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
                  <button style={{color: oneMonthColor}} type='button' value='1m' onClick={(e) => dateFunc(e.target.value)}>1M</button>
                </div>
                <div>
                  <button style={{color: threeMonthColor}} type='button' value='3m' onClick={(e) => dateFunc(e.target.value)}>3M</button>
                </div>
                <div>
                  <button style={{color: sixMonthColor}} type='button' value='6m' onClick={(e) => dateFunc(e.target.value)}>6M</button>
                </div>
                <div>
                  <button style={{color: yearColor}} type='button' value='1Y' onClick={(e) => dateFunc(e.target.value)}>1Y</button>
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
