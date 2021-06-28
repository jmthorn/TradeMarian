// constants
const SET_PORTFOLIO = "user/SET_PORTFOLIO"
const REMOVE_PORTFOLIO = "user/REMOVE_PORTFOLIO";


const setPortfolio = (data) => ({
    type: SET_PORTFOLIO,
    payload: data
})

export const clearPortfolio = () => ({
    type: REMOVE_PORTFOLIO
})


// user portfolio thunks

// get the user's portfolio
export const userPortfolio = () => async (dispatch) => {
    const response = await fetch('/api/users/', {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    const data = await response.json()
    if(data.errors) {
        return;
    }
    // limit prices to 2 decimals
    for(const part of data["portfolio_data"]) {
        part["value"] = (part["value"]).toFixed(2)
    }

    dispatch(setPortfolio(data))
}

//on logout, remove the portfolio from store
// export const clearPortfolio = () => async (dispatch) => {

// }


let initialState = {}
export default function reducer(state=initialState, action){
    switch (action.type) {
        case SET_PORTFOLIO:
            return {portfolio: action.payload}
        case REMOVE_PORTFOLIO:
            return { portfolio: null }
        default:
            return state
    }
}
