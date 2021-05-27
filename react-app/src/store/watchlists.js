const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS'
const CREATE_WATCHLIST = 'watchlists/CREATE_WATCHLIST'
const DELETE_WATCHLIST = 'watchlists/DELETE_WATCHLIST'
const ADD_ASSET = 'watchlists/ADD_ASSET'
const DELETE_ASSET = 'watchlists/DELETE_ASSET'


const loadWatchlists = (lists) => ({
    type: LOAD_WATCHLISTS,
    payload: lists
});

const createWatchlist = (list) => ({
    type: CREATE_WATCHLIST,
    payload: list
})

const removeWatchlist = (listId) => ({
    type: DELETE_WATCHLIST,
    payload: listId
})

const addAsset = (asset, watchlistId) => ({
    type: ADD_ASSET,
    payload: {
        asset,
        watchlistId
    }
})

const deleteAsset = (watchlistId, assetId) => ({
    type: DELETE_ASSET,
    payload: {
        watchlistId,
        assetId
    }
})

// thunks
// get all watchlists
export const watchlists = () => async (dispatch) => {
    const res = await fetch('/api/watchlists')

    if (res.ok) {
        let data = await res.json();
        dispatch(loadWatchlists(data))
    }
}

// create a watchlist
export const addNewWatchlist = (watchlist_name) => async (dispatch) => {
    const res = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            watchlist_name
        }),
    }),

    if (res.ok) {
        const newList = await res.json();
        dispatch(createWatchlist(newList))
    }
}

// remove a watchlist
dispatch(removeWatchlist(listId))

// add asset to a list
export const addAsset = (asset, watchlistId) => async (dispatch) => {
    const res = await fetch("POST")

    dispatch(addAsset(asset, watchlistId))
}

// remove asset from a list
export const removeAsset = (assetId, watchlistId) => async (dispatch) => {
    const res = await fetch("DELETE")

    dispatch(deleteAsset(watchlistId, assetId))
}


let initialState = {}
export default function reducer(state=initialState, action) {
    switch (action.type) {
        // initially load watchlists
        case LOAD_WATCHLISTS: {
            const newWatchlists = {};
            action.lists.forEach((list) => {
                newWatchlists[list.id] = list;
            })
            return {...state, ...watchlists}
        }
            // adding a new watchlist
        case CREATE_WATCHLIST:
            return {...state, [action.list.id]: action.list}
            // delete an entire watchlist
        case DELETE_WATCHLIST:
            const newState = {...state};
            delete newState[action.listId]
            return newState
        case ADD_ASSET:
            const newState = {...state};
            newState[action.watchlistId].assets.append(action.asset);
        case DELETE_ASSET:
            const newState = {...state};
            newState[action.watchlistId].assets.remove( assets.find(asset => asset.id == action.assetId) );
            return newState;
        default:
            return state
    }
}
