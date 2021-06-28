import { BUY_STOCK } from './transactions';
import { clearPortfolio } from './portfolio';
import { clearWatchlists } from './watchlists';

//constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"

const setUser = (user) => ({
  type: SET_USER,
  payload: user
})

const removeUser = () => ({
  type: REMOVE_USER
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json()
  if (data.errors) {
    return;
  }
  dispatch(setUser(data))
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json()
  if (data.errors) {
    return data;
  }
  dispatch(setUser(data))
  return {};
}

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  await response.json()
  dispatch(removeUser())
  dispatch(clearPortfolio())
  dispatch(clearWatchlists())

};


export const signUp = (firstName, lastName, username, email, password, buyingPower) => async (dispatch) => {
  // console.log(firstName, lastName, username, email, password, buyingPower)
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      buyingPower
    }),
  });
  const data = await response.json()
  // console.log('-----', data)
  if (data.errors) {
    return data
  }

  dispatch(setUser(data))
  return {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      // return initialState;
      return { user: null }
    case BUY_STOCK:
      return {
        user: {
          ...state.user,
          buying_power: state.user.buying_power - action.payload.share_quantity * action.payload.price_per_share
        }
      }
    default:
      return state
  }
}
