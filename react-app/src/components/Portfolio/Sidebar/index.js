import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import './sidebar.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Sidebar = () => {

  const user = useSelector(state => state.session.user)
  const history = useSelector(state => state.portfolio.portfolio?.history)
  const shares = useSelector(state => state.portfolio?.portfolio?.shares)

  const dispatch = useDispatch()

  const charts = []


  const smallCharts = () => {
      for (const stock in history) {
            console.log("HISTORY[STOCK]",stock)

        let lineColor = "";
            let prices = history[stock]
            if (prices[0].value > prices[(prices.length)-1].value) {
                lineColor = "#dc436f"; //pink
            } else {
                lineColor = "#97ef0c"; //green
            }

            charts.push(
                <div className="small-stock-container">
                    <div className="sidebar-share">
                        <div>{stock}</div>
                        <div>{shares[stock]} Share</div>
                    </div>
                    <div className="smallChart" key={history[stock].date}>
                        <LineChart width={120} height={40} data={history[stock]}
                            margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
                            <Line type="monotone"  dataKey="value" stroke={lineColor} strokeWidth={2} dot={false}/>
                            <XAxis dataKey="date" hide={true}/>
                            <YAxis dataKey="value" domain={['auto', 'auto']}  hide={true}/>
                            <Tooltip />
                        </LineChart>
                    </div>
                    <div>
                        <div>{}</div>
                        <div>{}</div>               
                    </div>
                </div>
          )
      }
      return charts
  }


  return (
      <div id="sidebar-container">
        <div id="stock-title">
            <div>Stocks</div>
        </div>
        <div className="stock-line"></div>
        {smallCharts()}
      </div>
  )
};

export default Sidebar;
