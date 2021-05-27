import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { stockInformation } from "../../store/assets";
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const StockGraph = () => {
  const stock = useSelector(state => state.assets.stockData);
  const stockData = stock.stock_data;
  const [dateRange, setDateRange] = useState(stockData);
  const [lineColor, setLineColor] = useState("")

  let stockDatePrice = []
  for (let i in stockData) {
    stockDatePrice.push({ "date": stockData[i]["date"], "price": stockData[i]["price"] })
  }

  useEffect( () => {
    let stockDatePriceArr = dateRange ? dateRange : stockData;
    if (stockDatePriceArr) {
      if (stockDatePriceArr[0]["price"] > stockDatePriceArr[(stockDatePriceArr.length) - 1]["price"]) {
        setLineColor("#dc436f"); //pink
      } else {
        setLineColor("#97ef0c"); //green
      }
    }

  }, [stockData, lineColor, dateRange])


  const dateFunc = (date) => {
    if (date === '1Y') {
      setDateRange(stockData)
    } else if (date == '6M') {
      setDateRange(stockData.slice((stockData.length) / 2))
    } else if (date == '3M') {
      setDateRange(stockData.slice(((stockData.length) / 4) * 3))
    } else if (date == '1M') {
      setDateRange(stockData.slice(((stockData.length) / 12) * 11))
    }
  }

  return (
    <div id='stock-graph-container'>
      <LineChart width={730} height={250} data={dateRange ? dateRange : stockData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" hide={true} />
        <YAxis dataKey="price" domain={['auto', 'auto']} hide={true} />
        <Tooltip offset={55} />
        <Line type="monotone" dataKey="price" stroke={lineColor} strokeWidth={1.5} dot={false} />
      </LineChart>
      <div id='stock-graph-btns'>
        <div>
          <button type='button' value='1M' onClick={(e) => dateFunc(e.target.value)}>1M</button>
        </div>
        <div>
          <button type='button' value='3M' onClick={(e) => dateFunc(e.target.value)}>3M</button>
        </div>
        <div>
          <button type='button' value='6M' onClick={(e) => dateFunc(e.target.value)}>6M</button>
        </div>
        <div>
          <button type='button' value='1Y' onClick={(e) => dateFunc(e.target.value)}>1Y</button>
        </div>
      </div>
    </div>
  )

}

export default StockGraph;