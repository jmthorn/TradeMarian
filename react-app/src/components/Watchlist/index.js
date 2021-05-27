import React from "react";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import {getWatchLists, addNewWatchlist, deleteWatchlist} from '../../../store/watchlists'
import './splash.css';


const Watchlist = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)

  const dispatch = useDispatch()

  useEffect(async() => { 
      await dispatch(getWatchLists())
  }, [])

  const createWatchlist = () => { 
      await dispatch(addNewWatchlist())
  }
 

  const deleteWatchlist = () => { 
      await dispatch(deleteWatchlist())
  }
 

  return (
      <>
        {watchlists.map((watchlist) => (
            <div>
                <div>{watchlist.watchlist.watchlist_name}</div>
                <button onClick={createWatchlist}>Create Watchlist</button>
                <button onClick={deleteWatchlist}>Delete Watchlist</button>
            </div>
        ))}
      </>
  )
};

export default Watchlist;