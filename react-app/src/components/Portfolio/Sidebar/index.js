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
            // console.log(history[stock])
            charts.push(
              <div key={history[stock].date}>
                  <LineChart width={200} height={600} data={history[stock]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <Line type="monotone"  dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false}/>
                      {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" /> */}
                      {/* <XAxis dataKey="date" />
                      <YAxis dataKey="value"/> */}
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
