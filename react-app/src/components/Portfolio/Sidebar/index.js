import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import './sidebar.css';
import { LineChart, Line, XAxis, YAxis } from "recharts";
import {getWatchLists, addNewWatchlist} from '../../../store/watchlists'

const Sidebar = () => {

  const user = useSelector(state => state.session.user)
  const history = useSelector(state => state.portfolio.portfolio?.history)
  const shares = useSelector(state => state.portfolio?.portfolio?.shares)
  const equity = useSelector(state => state.portfolio?.portfolio?.equity)
  const watchlists = useSelector(state => state.watchlists)
  const [newWatchlist, setNewWatchlist] = useState('');

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(async() => { 
      await dispatch(getWatchLists())
  }, [dispatch, watchlists])

  const charts = []
  const smallCharts = () => {
      for (const stock in history) {

        let lineColor = "";
            let prices = history[stock]
            if (prices[0].value > prices[(prices.length)-1].value) {
                lineColor = "#dc436f"; //pink
            } else {
                lineColor = "#97ef0c"; //green
            }

            charts.push(
              <Link to={`/stocks/${stock}`}>
                <div className="small-stock-container">
                    <div className="sidebar-share">
                        <div>{stock}</div>
                        <div id="shares-div">{shares[stock]} Shares</div>
                    </div>
                    <div className="smallChart" key={history[stock].date}>
                        <LineChart width={110} height={40} data={history[stock]}
                            margin={{ top: 0, right: 10, left: 10, bottom: 5 }}>
                            <Line type="monotone"  dataKey="value" stroke={lineColor} strokeWidth={1} dot={false}/>
                            <XAxis dataKey="date" hide={true}/>
                            <YAxis dataKey="value" domain={['auto', 'auto']}  hide={true}/>
                            {/* <Tooltip /> */}
                        </LineChart>
                    </div>
                    <div>
                        <div>{`$${ Math.round(equity[stock]*100) /100 }`}</div>
                    </div>
                </div>
              </Link>

          )
      }
      return charts
    }

    const createWatchlist = async(e) => { 
        e.preventDefault()

        let name = {
          watchlist_name: newWatchlist,
          user: user.id
        }
  
        await dispatch(addNewWatchlist(name))

        setNewWatchlist('');
    }
    
    const watchlist_arr = Object.values(watchlists)

    
    return (
        <div id="sidebar-container">
            <div id="stock-title">
                <div className="sidebar-titles">Stocks</div>
            </div>
            <div className="stock-line"></div>
            {smallCharts()}
            <div className="stock-line"></div>
            <div className="sidebar-titles">Your Watchlists</div>
            <div className="stock-line"></div>
            <div id="watchlists-container">
                {watchlist_arr.map((watchlist) => (
                    <a href={`/watchlists/${watchlist?.watchlist?.id}`}>
                        <div className="watchlist-container">
                            <p>{watchlist?.watchlist?.watchlist_name}</p>
                        </div>
                    </a>
                ))}
            </div>
            <div className="stock-line"></div>
            <div className="new-watchlist">
                <form className="new-watchlist-form">
                    <input required onChange={(e) => setNewWatchlist(e.target.value)} value={newWatchlist} placeholder="Watchlist Name"></input>
                    <button onClick={(e) => createWatchlist(e)}>+</button>
                </form>
            </div>
        </div>
    )
};

export default Sidebar;