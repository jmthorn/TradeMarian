import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockInformation } from "../../store/assets";
import BuySell from './BuySell';
import StockGraph from './StockGraph';

import './stock.css';

const Stock = () => {
    const { ticker_symbol } = useParams();
    const stock = useSelector(state => state.assets.stockData);
    // const stockData = stock.stock_data;
    const stockOverview = stock.stock_info;
    const dispatch = useDispatch();

    console.log('stockkkkk', stockOverview)
    
    useEffect(() => {
        dispatch(stockInformation(ticker_symbol.toUpperCase()));
    }, [dispatch, ticker_symbol]);
    
    if (!stockOverview) return null;

    return (
        <div id='stock-container'>
            {stockOverview.company_name}
            <div id='stock-graph'>
                <StockGraph />
                <BuySell ticker_symbol={ticker_symbol.toUpperCase()} />
            </div>
            <div id='about-stock'>
                <h4>About</h4>
                {stockOverview.description}
                <div>
                    CEO
                    <div>{stockOverview.ceo}</div>
                </div>
                <div>
                    Employees
                    <div>{stockOverview.employees}</div>
                </div>
                <div>
                    Headquarters
                    <div>{stockOverview.headquarters}</div>
                </div>
                <div>
                    Founded
                    <div>{stockOverview.founded}</div>
                </div>
            </div>
            <div id='key-stats'>
                <h4>Key Statistics</h4>
                <div>
                    Market Cap
                    <div>{stockOverview.market_cap}</div>
                </div>
                <div>
                    Price-Earnings Ratio
                    <div>{stockOverview.price_earning_ratio}</div>
                </div>
                <div>
                    Average Volume
                    <div>{stockOverview.average_volume}</div>
                </div>
            </div>
        </div>
    )
}

export default Stock;
