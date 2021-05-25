import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockPrices } from "../../store/assets";
import BuySell from './BuySell';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
    if (prices[prices.length - 1] < prices[prices.length - 2]) {
        lineColor = "#dc436f";
    } else {
        lineColor = "#97ef0c";
    }

    const dateFunc = (date) => {
    if(date == '1Y') {
        setDateRange(prices)
    } else if (date == '6m') {
        setDateRange(prices.slice(0, prices.length / 2))
    } else if (date == '1m') {
        setDateRange(prices.slice(0, prices.length / 12))
    }
  }

    return (
        <div id='stock-container'>
            <LineChart width={730} height={250} data={dateRange}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis dataKey="close" hide={true} />
                <YAxis domain={['auto', 'auto']} hide={true} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke={lineColor} strokeWidth={1.5} dot={false} />
            </LineChart>
            <div>
                <button type='button' value='1m' onClick={(e) => dateFunc(e.target.value)}>1m</button>
            </div>
            <div>
                <button type='button' value='6m' onClick={(e) => dateFunc(e.target.value)}>6m</button>
            </div>
            <div>
                <button type='button' value='1Y' onClick={(e) => dateFunc(e.target.value)}>1Y</button>
            </div>
            <BuySell ticker_symbol={ticker_symbol.toUpperCase()} />
        </div>
    )
}

export default Stock;
