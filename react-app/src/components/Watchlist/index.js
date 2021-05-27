import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import {getWatchLists, addNewWatchlist, deleteWatchlist} from '../../store/watchlists'
import './watchlist.css';


const Watchlist = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)
  const dispatch = useDispatch()
    console.log("WATCHLISTS VALUES", Object.values(watchlists))
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

//   const watchlistFunc = () => { 
//     for (const watchlist in Object.values(watchlists)) { 
//         console.log("WATCHLIST",watchlist.watchlist_name)
//         watchlist_arr.push(
//             <div>
//                 <div>{watchlist?.watchlist_name}</div>
//                 <button onClick={createWatchlist}>Create Watchlist</button>
//                 <button onClick={deleteWatchlist}>Delete Watchlist</button>
//             </div>
//         )
//     }
//     return watchlist_arr
//   }

  return (
      <>
        {watchlist_arr.map((watchlist) => (
            <div>
                <h1>{watchlist?.watchlist.watchlist_name}</h1>
                <button onClick={createWatchlist}>Create Watchlist</button>
                <button onClick={deleteWatchlist}>Delete Watchlist</button>
            </div>
        ))}
      </>
  )
};

export default Watchlist;