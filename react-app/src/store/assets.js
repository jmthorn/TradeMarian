const GET_ASSET_HP = "assets/GET_ASSET_HP";

const getAsset = (historicalPricesDict) => ({
    type: GET_ASSET_HP,
    historicalPricesDict
})


export const stockPrices = (ticker_symbol) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${ticker_symbol}`);

    if (res.ok) {
        let data = await res.json();
        dispatch(getAsset(Object.values(data)))
    }
}

let initialState = {
    historicalPrices: {}
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_ASSET_HP:
            // console.log('==============',action.historicalPricesDict)
            return {
                historicalPrices: action.historicalPricesDict
            };
        default:
            return state;
    }
}