import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import './sidebar.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Sidebar = () => {

  const user = useSelector(state => state.session.user)
  const history = useSelector(state => state.portfolio.portfolio?.history)
  const dispatch = useDispatch()

  const charts = []


  const smallCharts = () => {
      for (const stock in history) {
            console.log(history[stock])

        let lineColor = "";
            let prices = history[stock]
            if (prices[0].value > prices[(prices.length)-1].value) {
                lineColor = "#dc436f"; //pink
            } else {
                lineColor = "#97ef0c"; //green
            }
            
            charts.push(
              <div className="smallChart" key={history[stock].date}>
                  <LineChart width={200} height={100} data={history[stock]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <Line type="monotone"  dataKey="value" stroke={lineColor} strokeWidth={2} dot={false}/>
                      {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" /> */}
                      <XAxis dataKey="date" hide={true}/>
                      <YAxis dataKey="value" domain={['auto', 'auto']}  hide={true}/>
                      <Tooltip />
                      {/* <Legend /> */}
                  </LineChart>
              </div>
          )
      }
      return charts
  }


  return (
      <>
        <h1>$Sidebar</h1>
        {smallCharts()}
      </>
  )
};

export default Sidebar;
