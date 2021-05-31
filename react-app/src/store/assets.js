const GET_ASSET_HP = "assets/GET_ASSET_HP";

const getAsset = (data) => ({
    type: GET_ASSET_HP,
    data
})


export const stockInformation = (ticker_symbol) => async (dispatch) => {
    const res = await fetch(`/api/stocks/${ticker_symbol}`);

    if (res.ok) {
        let data = await res.json();

        // for(const part of data["stock_data"]) {
        //     console.log("partttttt.price.fixed", (part.price).toFixed(2))
        //     part.price = (part.price).toFixed(2)
        //     // console.log('==========partpirce fixed', (part["price"]).toFixed(2))
        // }

        dispatch(getAsset(data))
    }
}

let initialState = {
    stockData: {}
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_ASSET_HP:
            return {
                stockData: action.data
            };
        default:
            return state;
    }
}
