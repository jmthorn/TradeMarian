import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockTransaction } from "../../store/transactions";

const Sell = ({ user, ticker_symbol, price, shares }) => {
    // console.log('sharessssssssss', shares)
    const dispatch = useDispatch();
    const [sellPrice, setSellPrice] = useState((0).toFixed(2));
    const [userShares, setUserShares] = useState(shares);
    console.log('------shares------', typeof userShares);
    const [sharesSold, setSharesSold] = useState(0);
    const [buyingPower, setBuyingPower] = useState(user.buying_power);
    // if (!shares) return null    
    
    const sellTotal = e => {
        setSharesSold(e.target.value)
        setSellPrice((e.target.value * price).toFixed(2));
    };

    const sellAsset = async (e) => {
        e.preventDefault();
        // console.log(userShares)
        setUserShares(userShares - sharesSold)
        console.log('userShares', userShares)
        setBuyingPower((Number(buyingPower) + Number(sellPrice)).toString());
        
        let newBuyingPower = (Number(buyingPower) + Number(sellPrice)).toFixed(2);
        
        let newTransaction = {
            user_id: user.id,
            share_quantity: Number(-sharesSold),
            price_per_share: Number(price),
            buy_sell: false,
            buying_power: Number(newBuyingPower)
        }
        
        dispatch(stockTransaction(newTransaction, ticker_symbol));
    }

    return (
        <div>
            <form onSubmit={sellAsset}>
                Sell {ticker_symbol}
                <div className='transaction-labels'>Shares</div>
                <select name="shares" id="shares" onChange={sellTotal} value={sharesSold}>
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
                <div className='transaction-labels'>Estimated Credit</div>
                <div id='transaction-estimate'>
                    ${sellPrice}
                </div>
                <div>{userShares} Shares Available</div>
                <div>Buying Power: ${buyingPower}</div>
                <button type="submit" onClick={(e) => sellAsset(e)} disabled={(shares - sharesSold > 0 && sharesSold != "") ? false : true}>Sell</button>
            </form>
        </div>
    )
}

export default Sell;
