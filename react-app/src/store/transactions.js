const GET_PRICE = "transactions/GET_PRICE";
const BUY_STOCK = "transactions/BUY_STOCK";

const getPrice = (transactionPriceDict) => ({
  type: GET_PRICE,
  transactionPriceDict
});

const buyStock = (transaction) => ({
  type: BUY_STOCK,
  payload: transaction
})

export const stockPrice = (ticker_symbol) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${ticker_symbol}`);

  if (res.ok) {
    let data = await res.json();
    dispatch(getPrice(Object.values(data)));
  }
};

export const stockTransaction = (data, ticker_symbol) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${ticker_symbol}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data,
      ticker_symbol
    }),
  });

  console.log('res------', res);

  if (res.ok) {
    const transactionInfo = await res.json();

    console.log('transactioninfo------', transactionInfo);
    dispatch(buyStock(transactionInfo));
  }
};

let initialState = {
  transactionPrice: {},
  transactionData: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRICE:
      console.log('test')
      return {
        ...state,
        transactionPrice: action.transactionPriceDict
      };
    case BUY_STOCK:
      console.log('hello');
      return {
        ...state,
        transactionData: action.payload.transaction
      }
    default:
      return state;
  }
}
