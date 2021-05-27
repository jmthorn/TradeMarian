const GET_SEARCH_STRING = "search/GET_SEARCH_STRING"

const getSearchString = (data) => ({
    type: GET_SEARCH_STRING,
    data
});

export const searchString = (data) => async (dispatch) => {
    const res = await fetch(`/api/search/${data}`);

    if (res.ok) {
        let data = await res.json();
        dispatch(getSearchString(data))
    }
}

let initialState = {
    searchInfo: {}
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_SEARCH_STRING:
            return {
                searchInfo: action.data
            }
        default:
            return state;
    }
}