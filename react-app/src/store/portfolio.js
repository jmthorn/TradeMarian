// constants
const SET_PORTFOLIO = "user/SET_PORTFOLIO"


const setPortfolio = (data) => ({
    type: SET_PORTFOLIO,
    payload: data
})


// user portfolio thunks
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
    dispatch(setPortfolio(data))
}

let initialState = {}
export default function reducer(state=initialState, action){
    switch (action.type) {
        case SET_PORTFOLIO:
            return {portfolio: action.payload}
        default:
            return state
    }
}
