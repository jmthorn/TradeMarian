import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import {getWatchLists, addNewWatchlist, deleteWatchlist} from '../../store/watchlists'
import './watchlist.css';


const Watchlist = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)
  const dispatch = useDispatch()
  const params = useParams()

  let watchlistId = params.watchlistId



  useEffect(async() => { 
      await dispatch(getWatchLists())
  }, [])

  const createWatchlist = async() => { 
      await dispatch(addNewWatchlist())
  }
 

  const deleteWatchlist = async() => { 
      await dispatch(deleteWatchlist())
  }
 
  const watchlist_arr = Object.values(watchlists)
  let pageWatchlist = watchlist_arr.find((watchlist) => watchlist.watchlist.id == watchlistId)


  return (
      <>
        <button onClick={createWatchlist}>Create Watchlist</button>
        <button onClick={deleteWatchlist}>Delete Watchlist</button>
      </>
  )
};

export default Watchlist;