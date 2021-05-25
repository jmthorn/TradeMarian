const GET_PRICE = "transactions/GET_PRICE";
const BUY_STOCK = "transactions/BUY_STOCK";

const getPrice = (transactionPriceDict) => ({
  type: GET_PRICE,
  transactionPriceDict
});

const buyStock = (transaction) => ({
  type: BUY_STOCK,
  transaction
})

export const stockPrice = (ticker_symbol) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${ticker_symbol}`);

  if (res.ok) {
    let data = await res.json();
    console.log('data-------', data)
    dispatch(getPrice(Object.values(data)));
  }
};

export const stockTransaction = (data) => async (dispatch) => {
  const res = await fetch(`/api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });

  if (res.ok) {
    const transactionInfo = res.json();
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
      return {
        transactionPrice: action.transactionPriceDict
      };
    case BUY_STOCK:
      return {
        ...state,
        ...state.transactionPrice,
        ...action.transactionData
      }
    default:
      return state;
  }
}
