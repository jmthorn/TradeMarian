// import React, { useEffect, useState } from "react";
// // import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { stockInformation } from "../../store/assets";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

// const StockGraph = () => {
//   const stock = useSelector(state => state.assets.stockData);
//   const stockData = stock.stock_data;
//   const [dateRange, setDateRange] = useState(stockData);
//   const [lineColor, setLineColor] = useState("")
//   const [currentPrice, setCurrentPrice] = useState('')
//   const [currentChange, setCurrentChange] = useState('')
//   const [currentPercentChg, setCurrentPercentChg] = useState('')
//   const [sign, setSign] = useState('')
//   const [timeInterval, setTimeInterval] = useState('')
//   const [past, setPast] = useState('')

//   const dispatch = useDispatch()

//   useEffect(async() => {
//     await dispatch(stockInformation())
//   }, [])


//   let stockDatePrice = []
//   for (let i in stockData) {
//     stockDatePrice.push({ "date": stockData[i]["date"], "price": stockData[i]["price"] })
//   }

//   useEffect( () => {
//     let stockDatePriceArr = dateRange ? dateRange : stockData;
//     if (stockDatePriceArr) {
//       if (stockDatePriceArr[0]["price"] > stockDatePriceArr[(stockDatePriceArr.length) - 1]["price"]) {
//         setLineColor("#dc436f"); //pink
//       } else {
//         setLineColor("#97ef0c"); //green
//       }
//     }
//   }, [stockData, lineColor, dateRange])

//   if(!stockData) return null

//   const dateFunc = (date) => {
//     if (date === '1Y') {
//       setTimeInterval('1Y')
//       setDateRange(stockData)
//     } else if (date === '6M') {
//       setTimeInterval('6M')
//       setDateRange(stockData.slice((stockData.length) / 2))
//     } else if (date === '3M') {
//       setTimeInterval('3M')
//       setDateRange(stockData.slice(((stockData.length) / 4) * 3))
//       setTimeInterval('1M')
//       setDateRange(stockData.slice(((stockData.length) / 12) * 11))
//     }
//   }

//   const handleClick = (price) => {
//     setCurrentPrice(price.toFixed(2))
//     // condition on state of dateRange
//     console.log('stockdat price --------', stockData[0].price)
//     setCurrentChange( Math.abs( (price - stockData[0].price).toFixed(2) ) )
//     // calc percent change
//     if (stockData[(stockData?.length) -1].price > stockData[0].price) {
//       setCurrentPercentChg( Math.abs((((stockData[0].price - price) / price)*100).toFixed(5)))
//     } else {
//       setCurrentPercentChg( Math.abs((((price - stockData[0].price) / stockData[0].price)*100).toFixed(2)))
//     }
//     //set sign
//     if (stockData[(stockData?.length) -1].price > stockData[0].price) {
//       setSign('+')
//     } else {
//       setSign('-')
//     }
//     //set "Past"
//     if (timeInterval == '1m') {
//       setPast('Past Month')
//     } else if (timeInterval == '3m') {
//       setPast('Past 3 Months')
//     } else if (timeInterval == '6m') {
//       setPast('Past 6 Months')
//     } else if (timeInterval == '1Y') {
//       setPast('Past Year')
//     }
//   }


//   return (
//     <>
//       <div id='stock-graph-container'>
//         <div className='stock-ticker-container'>
//           <div id="ticker">
//                 <h1 id="">${currentPrice ? currentPrice : (stockData[(stockData?.length)-1]['price']).toFixed(2)}</h1>
//           </div>
//           <div id='ticker-change'>
//             <p>{`${sign ? sign : stockData[(stockData?.length) -1].price > stockData[0].price ? '+' : '-'}$${ currentChange ? currentChange : Math.abs( (stockData[(stockData?.length) -1].price - stockData[0].price).toFixed(2) )}
//               (${sign ? sign : stockData[(stockData?.length) -1].price > stockData[0].price ? '+' : '-'}${currentPercentChg ? currentPercentChg : Math.abs( (((stockData[0].price - stockData[(stockData?.length) -1].price)/ stockData[(stockData?.length) -1].price) * 100).toFixed(5) )  }%)`}
//               { past ? past : 'Past Year'}
//             </p>
//           </div>
//         </div>
//         <LineChart width={730} height={250} data={dateRange ? dateRange : stockData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//           onMouseMove={(e) => handleClick(e.activePayload ? console.log(e?.activePayload[0].payload.price) : stockData[(stockData.length)-1].price)}

//           >
//           <XAxis dataKey="date" hide={true} />
//           <YAxis dataKey="price" domain={['auto', 'auto']} hide={true} />
//           <Tooltip />
//           <Line type="monotone" dataKey="price" stroke={lineColor} strokeWidth={1.5} dot={false} />
//         </LineChart>
//         <div id='stock-graph-btns'>
//           <div>
//             <button type='button' value='1M' onClick={(e) => dateFunc(e.target.value)}>1M</button>
//           </div>
//           <div>
//             <button type='button' value='3M' onClick={(e) => dateFunc(e.target.value)}>3M</button>
//           </div>
//           <div>
//             <button type='button' value='6M' onClick={(e) => dateFunc(e.target.value)}>6M</button>
//           </div>
//           <div>
//             <button type='button' value='1Y' onClick={(e) => dateFunc(e.target.value)}>1Y</button>
//           </div>
//         </div>
//       </div>
//     </>
//   )

// }

// export default StockGraph;
