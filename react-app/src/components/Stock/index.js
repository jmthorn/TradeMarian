import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockPrices } from "../../store/assets";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './stock.css';


const StockPage = () => {
    const { ticker_symbol } = useParams();
    const prices = useSelector(state => state.assets.historicalPrices);
    console.log('-----------', prices);
    const dispatch = useDispatch();

    let closePrice = [];

    for (let i = 0; i <= prices.length - 1; i++) {
        for (let obj in prices) {
            for (let key in obj) {
                if (key === 'close') {
                    closePrice.push(obj[key])
                }
            }
        }
    }
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
                <Line type="monotone" dataKey="equity" stroke="#8884d8" />
            </LineChart>
        </div>
    )
}

export default StockPage;