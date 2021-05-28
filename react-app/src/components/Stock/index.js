import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockInformation } from "../../store/assets";
import { getPriceShares, stockTransaction } from "../../store/transactions";
import Buy from './Buy';
import Sell from './Sell';
import WatchlistModal from '../../context/watchlistmodal/index';
import { getWatchLists, addAssetWatchlist } from '../../store/watchlists';
import News from '../News';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import './stock.css';


const Headers = ({ titles, currentTab, selectTab }) => {
    const handleClick = (e) => {
        const idx = parseInt(e.target.id, 10);
        selectTab(idx);
    }

    const tabs = titles.map((title, idx) => {
        const headerClass = (idx === currentTab) ? 'active' : '';

        return (
            <li
                key={idx}
                id={idx}
                onClick={handleClick}
                className={headerClass}
            >
                {title}
            </li>
        );
    });

    return (
        <ul className='tab-header'>
            {tabs}
        </ul>
    );
}

const Stock = () => {
    const { ticker_symbol } = useParams();
    const stock = useSelector(state => state.assets.stockData);
    const stockOverview = stock.stock_info;
    const stockData = stock.stock_data;
    const user = useSelector(state => state.session.user);
    const stockTransactions = useSelector(state => state.transactions.transactionPrice)
    const closePrice = stockTransactions.price?.close.toFixed(2);
    const userShares = stockTransactions.shares?.[ticker_symbol];

    const [dateRange, setDateRange] = useState(stockData);
    const [lineColor, setLineColor] = useState("")
    const [currentPrice, setCurrentPrice] = useState('')
    const [currentChange, setCurrentChange] = useState('')
    const [currentPercentChg, setCurrentPercentChg] = useState('')
    const [sign, setSign] = useState('')
    const [timeInterval, setTimeInterval] = useState('')
    const [past, setPast] = useState('')
    const [currentTab, setCurrentTab] = useState(0);
    const[yearColor, setYearColor] = useState("#97ef0c")
    const[oneMonthColor, setOneMonthColor] = useState('#353535')
    const[threeMonthColor, setThreeMonthColor] = useState('#353535')
    const[sixMonthColor, setSixMonthColor] = useState('#353535')

    const dispatch = useDispatch();
    const watchlists = useSelector(state => state.watchlists);

    console.log('watchlistssssss', watchlists);

    const [showDropdown, setShowDropdown] = useState(false);
    const [checked, setChecked] = useState(0);
    const onClick = () => setShowDropdown(true)


    const folders = [{ title: `Buy ${ticker_symbol}` }, { title: `Sell ${ticker_symbol}` }]
    const titles = folders.map((folder) => folder.title);


    useEffect(() => {
        dispatch(stockInformation(ticker_symbol.toUpperCase()));
    }, [dispatch, ticker_symbol]);
   

    useEffect(async() => {
        await dispatch(getPriceShares(ticker_symbol.toUpperCase()));
    }, []);

    useEffect(async() => { 
        await dispatch(getWatchLists())
    }, [])

    useEffect( () => {
        let stockDatePriceArr = dateRange ? dateRange : stockData;
        if (stockDatePriceArr) {
          if (stockDatePriceArr[0]["price"] > stockDatePriceArr[(stockDatePriceArr.length) - 1]["price"]) {
            setLineColor("#dc436f"); //pink
          } else {
            setLineColor("#97ef0c"); //green
          }
        }
    }, [stockData, lineColor, dateRange])

    useEffect(() => {

            if (timeInterval === '1Y') {

                setDateRange(stockData)
                setYearColor(lineColor)
                setOneMonthColor("#353535")
                setThreeMonthColor("#353535")
                setSixMonthColor("#353535")
              } else if (timeInterval === '6M') {

                setDateRange(stockData.slice((stockData.length) / 2))
                setYearColor("#353535")
                setOneMonthColor("#353535")
                setThreeMonthColor("#353535")
                setSixMonthColor(lineColor)
              } else if (timeInterval === '3M') {

                setDateRange(stockData.slice(((stockData.length) / 4) * 3))
                setYearColor("#353535")
                setOneMonthColor("#353535")
                setThreeMonthColor(lineColor)
                setSixMonthColor("#353535")
              } else if (timeInterval === '1M') {

                setDateRange(stockData.slice(((stockData.length) / 12) * 11))
                setYearColor("#353535")
                setOneMonthColor(lineColor)
                setThreeMonthColor("#353535")
                setSixMonthColor("#353535")
              }


    }, [timeInterval, stockData, lineColor, yearColor, oneMonthColor, threeMonthColor, sixMonthColor])

    if(!stockData) return null



      const handleClick = (price) => {
        setCurrentPrice(price?.toFixed(2))
        // condition on state of dateRange
        console.log('stockdat price --------', stockData[0].price)
        setCurrentChange( Math.abs( (price - stockData[0].price).toFixed(2) ) )
        // calc percent change
        if (stockData[(stockData?.length) -1].price > stockData[0].price) {
          setCurrentPercentChg( Math.abs((((stockData[0].price - price) / price)*100).toFixed(5)))
        } else {
          setCurrentPercentChg( Math.abs((((price - stockData[0].price) / stockData[0].price)*100).toFixed(2)))
        }
        //set sign
        if (dateRange ? dateRange[0]['price'] < dateRange[dateRange.length -1]['price'] : stockData[(stockData?.length) -1].price > stockData[0].price) {
          setSign('+')
        } else {
          setSign('-')
        }
        //set "Past"
        if (timeInterval == '1M') {
          setPast('Past Month')
        } else if (timeInterval == '3M') {
          setPast('Past 3 Months')
        } else if (timeInterval == '6M') {
          setPast('Past 6 Months')
        } else if (timeInterval == '1Y') {
          setPast('Past Year')
        }
      }

    const watchlist_arr = Object.values(watchlists)

    const Dropdown = () => (
        <div id="watchlists-container">
            {watchlist_arr.map((watchlist) => (
                <a href={`/watchlists/${watchlist.watchlist.id}`}>
                    <div className="watchlist-container">
                        <p>{watchlist?.watchlist.watchlist_name}</p>
                        <input type="radio" checked={checked === watchlist?.watchlist.id} onChange={() => setChecked(watchlist?.watchlist.id)} name="watchlist"></input>
                        {console.log('after', checked)}
                    </div>
                </a>
            ))}
        </div>
    )

    const addToWatchlist = async(e) => { 

        let watchlistId = checked;
        let asset = stockOverview?.id
  
        await dispatch(addAssetWatchlist(asset, watchlistId))
    }

    return (
        <div id='stock-container'>
            {stockOverview?.company_name}
            <div id='stock-graph'>
            <div id='stock-graph-container'>
                <div className='stock-ticker-container'>
                <div id="ticker">
                        <h1 id="">${currentPrice ? currentPrice : (stockData[(stockData?.length)-1]['price']).toFixed(2)}</h1>
                </div>
                <div id='ticker-change'>
                    <p>{`${sign ? sign : stockData[(stockData?.length) -1].price > stockData[0].price ? '+' : '-'}$${ currentChange ? currentChange : Math.abs( (stockData[(stockData?.length) -1].price - stockData[0].price).toFixed(2) )}
                    (${sign ? sign : stockData[(stockData?.length) -1].price > stockData[0].price ? '+' : '-'}${currentPercentChg ? currentPercentChg : Math.abs( (((stockData[0].price - stockData[(stockData?.length) -1].price)/ stockData[(stockData?.length) -1].price) * 100).toFixed(5) )  }%)`}
                    { past ? past : 'Past Year'}
                    </p>
                </div>
                </div>
                <LineChart width={730} height={250} data={dateRange ? dateRange : stockData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onMouseMove={(e) => handleClick(e.activePayload ? e?.activePayload[0].payload.price : stockData[(stockData.length)-1].price)}
                >
                <XAxis dataKey="date" hide={true} />
                <YAxis dataKey="price" domain={['auto', 'auto']} hide={true} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke={lineColor} strokeWidth={1.5} dot={false} />
                </LineChart>
                <div id='stock-graph-btns'>
                <div>
                    <button style={{color: oneMonthColor}} type='button' value='1M' onClick={(e) => setTimeInterval('1M')}>1M</button>
                </div>
                <div>
                    <button style={{color: threeMonthColor}} type='button' value='3M' onClick={(e) => setTimeInterval('3M')}>3M</button>
                </div>
                <div>
                    <button style={{color: sixMonthColor}} type='button' value='6M' onClick={(e) => setTimeInterval('6M')}>6M</button>
                </div>
                <div>
                    <button style={{color: yearColor}} type='button' value='1Y' onClick={(e) => setTimeInterval(e.target.value)}>1Y</button>
                </div>
                </div>
            </div>




                <section>
                    <div className='tabs'>
                        <Headers
                            titles={titles}
                            currentTab={currentTab}
                            selectTab={setCurrentTab}
                        />
                        <div className='tab-content'>
                            {currentTab === 0 &&
                                <Buy user={user} ticker_symbol={ticker_symbol.toUpperCase()} price={closePrice} />}
                            {currentTab === 1 && <Sell user={user} ticker_symbol={ticker_symbol.toUpperCase()} price={closePrice} shares={userShares} />}
                        </div>
                    </div>
                    <div>
                        <button onClick={onClick}>Add To List</button>
                        { showDropdown ? <Dropdown/> : null}
                        <button onClick={addToWatchlist}>Save Changes</button>
                    </div>
                </section>
            </div>
            <div id='stock-specific-info'>
                <div id='about-stock'>
                    <h4>About</h4>
                    {stockOverview?.description}
                    <div>
                        CEO
                        <div>{stockOverview?.ceo}</div>
                    </div>
                    <div>
                        Employees
                        <div>{stockOverview?.employees}</div>
                    </div>
                    <div>
                        Headquarters
                        <div>{stockOverview?.headquarters}</div>
                    </div>
                    <div>
                        Founded
                        <div>{stockOverview?.founded}</div>
                    </div>
                </div>
                <div id='key-stats'>
                    <h4>Key Statistics</h4>
                    <div>
                        Market Cap
                        <div>{stockOverview?.market_cap}</div>
                    </div>
                    <div>
                        Price-Earnings Ratio
                        <div>{stockOverview?.price_earning_ratio}</div>
                    </div>
                    <div>
                        Average Volume
                        <div>{stockOverview?.average_volume}</div>
                    </div>
                </div>
            </div>
            <News ticker_symbol={ticker_symbol} />
        </div>
    )
}

export default Stock;


// dateRange ? dateRange[0]["price"] > dateRange[(dateRange.length) - 1]["price"] ? "#dc436f" : "#97ef0c" : stockData[0]["price"] > stockData[(stockData.length) - 1]["price"] ? "#dc436f" : "#97ef0c"
