import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockInformation } from "../../store/assets";
import { stockPrice, stockTransaction } from "../../store/transactions";
import Buy from './Buy';
import Sell from './Sell';
import StockGraph from './StockGraph';
import News from '../News';

import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const stock = useSelector(state => state.assets.stockData);
    const stockTransactions = useSelector(state => state.transactions.transactionPrice)
    const closePrice = stockTransactions.price?.close.toFixed(2);
    const userShares = stockTransactions.shares?.[ticker_symbol];
  
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
    
    if (!userShares) {
        return (
            <div id='stock-graph'>
                <StockGraph />
                <Buy user={user} ticker_symbol={ticker_symbol.toUpperCase()} price={closePrice} />
            </div>
        )
    };

    return (
        <div id='stock-container'>
            {stockOverview?.company_name}
            <div id='stock-graph'>
                <StockGraph />
                <Buy user={user} ticker_symbol={ticker_symbol.toUpperCase()} price={closePrice} />
                <Sell user={user} ticker_symbol={ticker_symbol.toUpperCase()} price={closePrice} shares={userShares} />
            </div>
            <div id='stock-specific-info'>
                <div id='about-stock'>
                    <h4>About</h4>
                    {stockOverview?.description}
                    <div>
                        CEO
                        <div>{stockOverview?.ceo}</div>
                    </div>
                    <div>
                        Employees
                        <div>{stockOverview?.employees}</div>
                    </div>
                    <div>
                        Headquarters
                        <div>{stockOverview?.headquarters}</div>
                    </div>
                    <div>
                        Founded
                        <div>{stockOverview?.founded}</div>
                    </div>
                </div>
                <div id='key-stats'>
                    <h4>Key Statistics</h4>
                    <div>
                        Market Cap
                        <div>{stockOverview?.market_cap}</div>
                    </div>
                    <div>
                        Price-Earnings Ratio
                        <div>{stockOverview?.price_earning_ratio}</div>
                    </div>
                    <div>
                        Average Volume
                        <div>{stockOverview?.average_volume}</div>
                    </div>
                </div>
            </div>
            <News ticker_symbol={ticker_symbol}/>
        </div>
    )
}

export default Stock;
