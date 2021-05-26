import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockInformation } from "../../store/assets";
import BuySell from './BuySell';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const stock = useSelector(state => state.assets.stockData);
    const stockData = stock.stock_data;
    console.log(stockData, '=================stockdata')
    const stockOverview = stock.stock_info;
    const dispatch = useDispatch();
    const [dateRange, setDateRange] = useState(stockData);

    useEffect(() => {
        dispatch(stockInformation(ticker_symbol.toUpperCase()));
    }, [dispatch, ticker_symbol]);

    if (!stockData) return null;

    let lineColor = "";

    if (stockData[0] > stockData[stockData.length - 1]) {
        lineColor = "#dc436f"; // pink
    } else {
        lineColor = "#97ef0c"; // green
    }


    const dateFunc = (date) => {
    if(date == '1Y') {
        setDateRange(stockData)
    } else if (date == '6M') {
        setDateRange(stockData.slice(0, stockData.length / 2))
    } else if (date == '1M') {
        setDateRange(stockData.slice(0, stockData.length / 12))
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
