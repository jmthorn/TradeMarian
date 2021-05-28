import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import {getWatchLists, addNewWatchlist, deleteWatchlist} from '../../store/watchlists'
import './watchlist.css';


const Watchlist = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)
  const dispatch = useDispatch()
  const { watchlistId } = useParams()

  const [newWatchlist, setNewWatchlist] = useState('');


  useEffect(async() => { 
      await dispatch(getWatchLists())
  }, [])

  const createWatchlist = async(e) => { 
      // setNewWatchlist(e.target.value)

      let name = {
        watchlist_name: newWatchlist,
        user: user.id
      }

      await dispatch(addNewWatchlist(name))
  }
 

  const deleted = async() => { 
      await dispatch(deleteWatchlist(watchlistId))
  }
 
  const watchlist_arr = Object.values(watchlists)
  let pageWatchlist = watchlist_arr.find((watchlist) => watchlist.watchlist.id == watchlistId)


  return (
      <>
        <form>
          <input onChange={(e) => setNewWatchlist(e.target.value)} value={newWatchlist} placeholder="Watchlist Name"></input>
        </form>
        <button onClick={() => createWatchlist(newWatchlist)}>Create Watchlist</button>
        <button onClick={deleted}>Delete Watchlist</button>
      </>
  )
};

export default Watchlist;