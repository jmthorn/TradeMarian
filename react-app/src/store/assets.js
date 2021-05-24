const GET_ASSET_HP = "assets/GET_ASSET_HP";

const getAsset = (historicalPricesDict) => ({
    type: GET_ASSET_HP,
    historicalPricesDict
})


export const stockPrices = (ticker_symbol) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${ticker_symbol}`);

    console.log('res---', res);

    if (res.ok) {
        let data = await res.json();

        // console.log(Object.values(data))
        dispatch(getAsset(Object.values(data)))
    }
}

let initialState = {
    historicalPrices: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_ASSET_HP:
            return {...state, historicalPrices: action.historicalPricesDict};
        default:
            return state;
    }
}