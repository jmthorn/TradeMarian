import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom';
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
      history.push('/')
  }
  
  const deleteAsset = async(assetId) => {
    let id = pageWatchlist?.watchlist?.id;
    await dispatch(removeAsset(assetId, id))
  }
  

  return (
      <>
        <div className="watchlist-page">
          <div className="watchlist-title">
            <h2>{pageWatchlist?.watchlist?.watchlist_name}</h2>
            <div>
              <button onClick={deleted}>Delete Watchlist</button>
            </div>
          </div>
          <div className="watchlist-line"></div>
          <div id="watchlists-container">
            <table>
              <th>Company Name</th>
              <th>Ticker Symbol</th>
              <th>Average Volume</th>
              <th>Divident Yield</th>
              <th>Date Founded</th>
              <th >Delete Asset</th>

              {pageWatchlist?.assets.map((asset) => (
                <tr>
                  <td><Link to={`/stocks/${asset.ticker_symbol}`} >{asset.company_name}</Link></td>
                  <td><Link to={`/stocks/${asset.ticker_symbol}`} >{asset.ticker_symbol}</Link></td>
                  <td><Link to={`/stocks/${asset.ticker_symbol}`} >{asset.average_volume}</Link></td>
                  <td><Link to={`/stocks/${asset.ticker_symbol}`} >{asset.dividend_yield}</Link></td>
                  <td><Link to={`/stocks/${asset.ticker_symbol}`} >{asset.founded}</Link></td>
                  <td className="delete-asset"><button value={asset.id} onClick={(e) => deleteAsset(e.target.value)}>x</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </>
  )
};

export default Watchlist;