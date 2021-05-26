import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockPrice, stockTransaction } from "../../store/transactions";

const Buy = ({ ticker_symbol }) => {
  const dispatch = useDispatch();
  const price = Number(useSelector(state => state.transactions.transactionPrice)[0]).toFixed(2);
  const data = useSelector(state => state.transactions.transactionData);
  const user = useSelector(state => state.session.user);
  const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
  const [shares, setShares] = useState(0);
  const [buyingPower, setBuyingPower] = useState(user.buying_power);

  useEffect(() => {
    dispatch(stockPrice(ticker_symbol));
  }, [dispatch, ticker_symbol]);


  const transactionTotal = e => {
    setShares(e.target.value)
    setTransactionPrice((e.target.value * price).toFixed(2));

    // if (buyingPower < Number(price)) {
    //   document.getElementById('buy-btn').disabled = false;
    // }
  };

  const buyAsset = async (e) => {
    e.preventDefault();
    
    setBuyingPower((buyingPower - transactionPrice).toFixed(2));
    let newBuyingPower = (buyingPower - transactionPrice).toFixed(2)
    
    
    let newTransaction = {
      user_id: user.id,
      share_quantity: Number(shares),
      price_per_share: Number(price),
      buy_sell: true,
      buying_power: Number(newBuyingPower)
    }
    dispatch(stockTransaction(newTransaction, ticker_symbol));
  }

  return (
    <div>
      <form onSubmit={buyAsset}>
        Buy {ticker_symbol}
        <div className='transaction-labels'>Shares</div>
        <select name="shares" id="shares" onChange={transactionTotal} value={shares}>
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
        <div>Buying Power: ${buyingPower}</div>
        <button id='buy-btn' type="submit" onClick={(e) => buyAsset(e)} disabled={buyingPower > Number(transactionPrice) ? false : true}>Buy</button>
      </form>
    </div>
  )
}

export default Buy;
