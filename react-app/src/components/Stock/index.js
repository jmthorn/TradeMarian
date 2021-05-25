import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockPrices } from "../../store/assets";
import Buy from './Buy';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const prices = useSelector(state => state.assets.historicalPrices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(stockPrices(ticker_symbol.toUpperCase()))
    }, [dispatch, ticker_symbol])

    let lineColor = "";
    if (prices[prices.length - 1] < prices[prices.length - 2]) {
        lineColor = "#dc436f";
    } else {
        lineColor = "#97ef0c";
    }

    return (
        <div id='stock-container'>
            <LineChart width={730} height={250} data={prices}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis dataKey="close" hide={true} />
                <YAxis domain={['auto', 'auto']} hide={true} />
                <Tooltip />
                <Line type="monotone" dataKey="close" stroke={lineColor} strokeWidth={1.5} dot={false} />
            </LineChart>
            <Buy ticker_symbol={ticker_symbol.toUpperCase()} />
        </div>
    )
}

export default Stock;
