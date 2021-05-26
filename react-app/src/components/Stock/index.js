import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockInformation } from "../../store/assets";
import Buy from './Buy';
import StockGraph from './StockGraph';

import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const stock = useSelector(state => state.assets.stockData);
    const stockData = stock.stock_data;
    const stockOverview = stock.stock_info;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(stockInformation(ticker_symbol.toUpperCase()));
    }, [dispatch, ticker_symbol]);

    return (
        <div id='stock-container'>
            <StockGraph />
            <Buy ticker_symbol={ticker_symbol.toUpperCase()} />
        </div>
    )
}

export default Stock;
