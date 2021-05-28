const SET_GEN_NEWS = "news/SET_GEN_NEWS"
const SET_STOCK_NEWS = "news/SET_STOCK_NEWS"

const setGenNews = (data) => ({
    type:SET_GEN_NEWS,
    payload:data
})

const setStockNews = (data) => ({
    type:SET_STOCK_NEWS,
    payload:data
})


//news thunks
export const genNews = () => async(dispatch) => { 
    const response = await fetch('/api/news/', { 
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    if(data.errors) { 
        return 
    }
    dispatch(setGenNews(data))
}


export const stockNews = (ticker_symbol) => async(dispatch) => { 
    
    const response = await fetch(`/api/news/${ticker_symbol}`, {
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    if(data.errors) { 
        return 
    }
    dispatch(setStockNews(data))
}


let initialState ={}
export default function reducer(state=initialState, action) { 
    switch (action.type) { 
        case SET_GEN_NEWS:
            return {gen_news: action.payload}
        case SET_STOCK_NEWS:
            return {stock_news: action.payload}
        default:
            return state
    }
}
