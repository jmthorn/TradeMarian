import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import {getWatchLists, removeAsset, deleteWatchlist} from '../../store/watchlists'
import './watchlist.css';


const Watchlist = () => {
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const watchlists = useSelector(state => state.watchlists)
  const dispatch = useDispatch()
  const { watchlistId } = useParams()
  const watchlist_arr = Object.values(watchlists)
  let pageWatchlist = watchlist_arr.find((watchlist) => watchlist.watchlist.id == watchlistId)


  useEffect(async() => { 
      await dispatch(getWatchLists())
  }, [dispatch, pageWatchlist])


  const deleted = async() => { 
      await dispatch(deleteWatchlist(watchlistId))
  }
  
  const deleteAsset = async(assetId) => {
    let id = pageWatchlist?.watchlist?.id;
    await dispatch(removeAsset(assetId, id))
  }
  

  return (
      <>
        <div id="watchlists-container">
                {pageWatchlist?.assets.map((asset) => (
                  <div>
                    <div>{asset.company_name}</div>
                    <div>{asset.ticker_symbol}</div>
                    <div>{asset.average_volume}</div>
                    <div>{asset.dividend_yield}</div>
                    <div>{asset.founded}</div>
                    <button value={asset.id} onClick={(e) => deleteAsset(e.target.value)}>Delete Asset</button>
                  </div>
                ))}
        </div>
        <button onClick={deleted}>Delete Watchlist</button>
      </>
  )
};

export default Watchlist;