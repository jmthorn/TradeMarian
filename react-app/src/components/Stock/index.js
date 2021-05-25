import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockPrices } from "../../store/assets";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const prices = useSelector(state => state.assets.historicalPrices);
    console.log('-----------', prices);
    const dispatch = useDispatch();

    let closePrice = [];

    for (let obj in prices) {
            closePrice.push({ 'close': prices[obj]['close'], 'date': prices[obj]['date'] })
    }


    console.log('test----', closePrice)
    useEffect(() => {
        dispatch(stockPrices(ticker_symbol.toUpperCase()))
    }, [dispatch, ticker_symbol])

    return (
        <div id='stock-container'>
            <LineChart width={730} height={250} data={closePrice}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="price" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="close" stroke="#dc436f" />
            </LineChart>
        </div>
    )
}

export default Stock;