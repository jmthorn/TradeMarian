import React from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './sidebar.css';
import { LineChart, Line, XAxis, YAxis } from "recharts";

const Sidebar = () => {

  const user = useSelector(state => state.session.user)
  const history = useSelector(state => state.portfolio.portfolio?.history)
  const shares = useSelector(state => state.portfolio?.portfolio?.shares)
  const equity = useSelector(state => state.portfolio?.portfolio?.equity)


  const dispatch = useDispatch()


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
