const GET_SEARCH_STOCKS = "search/GET_SEARCH_STOCKS"

const getSearchStocks = (stocks) => ({
    type: GET_SEARCH_STOCKS,
    stocks
});

export const stockSearch = () => async (dispatch) => {
    const res = await fetch(`/api/search`, {
        mode: 'no-cors',
    });

    if (res.ok) {
        dispatch(getSearchStocks());
    }
}

let initialState = {
    searchInfo: {}
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_SEARCH_STOCKS:
            return {
                searchInfo: action.stocks
            }
        default:
            return state;
    }
}