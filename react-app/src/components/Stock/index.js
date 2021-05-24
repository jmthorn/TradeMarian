import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockPrices } from "../../store/assets";

const StockPage = () => {
    const { ticker_symbol } = useParams();
    const prices = useSelector(state => state.assets.historicalPrices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(stockPrices(ticker_symbol.toUpperCase()))
    }, [dispatch, ticker_symbol])

    return (
        <div>
            Test
            { console.log(prices) }
        </div>
    )
}

export default StockPage;