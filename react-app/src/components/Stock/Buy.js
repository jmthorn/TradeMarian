import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockTransaction } from "../../store/transactions";

const Buy = ({ user, ticker_symbol, price }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.transactions.transactionData);
  const [transactionPrice, setTransactionPrice] = useState((0).toFixed(2));
  const [sharesBought, setSharesBought] = useState(0);
  const [order, setOrder] = useState('Review Order')
  const [buyingPower, setBuyingPower] = useState(user?.buying_power || 0);

  const transactionTotal = e => {
    setSharesBought(e.target.value)
    setTransactionPrice((e.target.value * price).toFixed(2));
  };

  const buyAsset = async (e) => {
    e.preventDefault();
    setOrder('Ordered');
    setBuyingPower((buyingPower - transactionPrice).toFixed(2));
    
    let newBuyingPower = (buyingPower - transactionPrice).toFixed(2)

    let newTransaction = {
      user_id: user.id,
      share_quantity: Number(sharesBought),
      price_per_share: Number(price),
      buy_sell: true,
      buying_power: Number(newBuyingPower)
    }
    dispatch(stockTransaction(newTransaction, ticker_symbol));
  }

  if (buyAsset) {
    setTimeout(() => {
        setOrder('Review Order');
    }, 3500);
  }

  return (
    <div>
      <form onSubmit={buyAsset}>
        <div className='transaction-info'>
          <div className='transaction-labels'>Shares</div>
          <select name="shares" id="shares" onChange={transactionTotal} value={sharesBought}>
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
        </div>
        <div className='transaction-info'>
          <div className='transaction-labels'>Market Price</div>
          <div id='transaction-stock-price'>
            ${price}
          </div>
        </div>
        <hr />
        <div className='transaction-info'>
          <div className='transaction-labels'>Estimated Cost</div>
          <div id='transaction-estimate'>
            ${transactionPrice}
          </div>
        </div>
        <div className='transaction-btn'>
          <button id='buy-btn' type="submit"
            onClick={(e) => {
              buyAsset(e);
            }}
            disabled={(buyingPower > Number(transactionPrice) && sharesBought != "") ? false : true}>
              {order}
            </button>
        </div>
        <div className='transaction-labels' id='buying-power'>${buyingPower} buying power available</div>
      </form>
    </div>
  )
}

export default Buy;
