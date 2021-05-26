import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockInformation } from "../../store/assets";
import { stockPrice, stockTransaction } from "../../store/transactions";
import Buy from './Buy';
import Sell from './Sell';
import StockGraph from './StockGraph';

import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const stock = useSelector(state => state.assets.stockData);
    const stockData = stock.stock_data;
    const stockOverview = stock.stock_info;
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
   
    useEffect(() => {
        dispatch(stockInformation(ticker_symbol.toUpperCase()));
    }, [dispatch, ticker_symbol]);

    useEffect(() => {
        dispatch(stockPrice(ticker_symbol));
    }, [dispatch, ticker_symbol]);

    return (
        <div id='stock-container'>
            <StockGraph />
            {/* <Buy user={user} ticker_symbol={ticker_symbol.toUpperCase()} /> */}
            <Sell user={user} ticker_symbol={ticker_symbol.toUpperCase()} />
        </div>
    )
}

export default Stock;
