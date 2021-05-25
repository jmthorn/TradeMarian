import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockPrice } from "../../store/transactions";

const BuySell = ({ ticker_symbol }) => {
  const dispatch = useDispatch();
  const price = useSelector(state => state.transactions.transactionPrice);
  useEffect(() => {
    dispatch(stockPrice(ticker_symbol));
  }, [dispatch, ticker_symbol]);

  return (
    <div>
      test
    </div>
  )
}

export default BuySell;