import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sell = ({ ticker_symbol }) => {
    const dispatch = useDispatch();
    const [shares, setShares] = useState(0);
    const [sellPrice, setSellPrice] = useState((0).toFixed(2));
    const [buyingPower, setBuyingPower] = useState(user.buying_power);
    
    const sellTotal = e => {
        setShares(e.target.value)
        setTransactionPrice((e.target.value * price).toFixed(2));
    };

    return (
        <div>
            <form onSubmit={buyAsset}>
                Buy {ticker_symbol}
                <div className='transaction-labels'>Shares</div>
                <select name="shares" id="shares" onChange={sellTotal} value={shares}>
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <div className='transaction-labels'>Market Price</div>
                <div id='transaction-stock-price'>
                    ${price}
                </div>
                <div className='transaction-labels'>Estimated Cost</div>
                <div id='transaction-estimate'>
                    ${transactionPrice}
                </div>
                <div>Buying Power: ${user.buying_power}</div>
                <button type="submit" onClick={(e) => buyAsset(e)}>Buy</button>
            </form>
        </div>
    )
}

export default Sell;
