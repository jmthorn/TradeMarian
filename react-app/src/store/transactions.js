const GET_PRICE = "transactions/GET_PRICE";

const getPrice = (transactionPriceDict) => ({
  type: GET_PRICE,
  transactionPriceDict
})

export const stockPrice = (ticker_symbol) => async (dispatch) => {
  const res = await fetch(`/api/transactions/${ticker_symbol}`);

  if (res.ok) {
    let data = await res.json();
    console.log('data-------', data)
    dispatch(getPrice(Object.values(data)));
  }
}


let initialState = {
  transactionPrice: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRICE:
      return {
        transactionPrice: action.transactionPriceDict
      };
    default:
      return state;
  }
}