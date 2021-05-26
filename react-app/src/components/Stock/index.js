import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockPrices } from "../../store/assets";
import BuySell from './BuySell';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const prices = useSelector(state => state.assets.historicalPrices);
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState(prices)

    useEffect(() => {
        dispatch(stockPrices(ticker_symbol.toUpperCase()))
    }, [dispatch, ticker_symbol])

    let lineColor = "";
    if (prices[0] > prices[prices.length - 1]) {
        lineColor = "#dc436f"; // pink
    } else {
        lineColor = "#97ef0c"; // green
    }

    const dateFunc = (date) => {
    if(date == '1Y') {
        setDateRange(prices)
    } else if (date == '6M') {
        setDateRange(prices.slice(0, prices.length / 2))
    } else if (date == '1M') {
        setDateRange(prices.slice(0, prices.length / 12))
    }
  }

    return (
        <div id='stock-container'>
            <LineChart width={730} height={250} data={dateRange}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis dataKey="date" hide={true} />
                <YAxis dataKey="close" domain={['auto', 'auto']} hide={true} />
                <Tooltip offset={55}/>
                <Line type="monotone" dataKey="close" stroke={lineColor} strokeWidth={1.5} dot={false} />
            </LineChart>
            <div>
                <button type='button' value='1M' onClick={(e) => dateFunc(e.target.value)}>1M</button>
            </div>
            <div>
                <button type='button' value='6M' onClick={(e) => dateFunc(e.target.value)}>6M</button>
            </div>
            <div>
                <button type='button' value='1Y' onClick={(e) => dateFunc(e.target.value)}>1Y</button>
            </div>
            <BuySell ticker_symbol={ticker_symbol.toUpperCase()} />
        </div>
    )
}

export default Stock;
