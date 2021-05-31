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


    const [showDropdown, setShowDropdown] = useState(false);
    const [checked, setChecked] = useState(0);
    const [choiceMade, setChoiceMade] = useState(false)
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
    }, [stockData, lineColor, dateRange, ticker_symbol])

    useEffect(() => {

        if (timeInterval === '1Y') {
            setYearColor(lineColor)
            setOneMonthColor("#353535")
            setThreeMonthColor("#353535")
            setSixMonthColor("#353535")
        } else if (timeInterval === '6M') {
            setYearColor("#353535")
            setOneMonthColor("#353535")
            setThreeMonthColor("#353535")
            setSixMonthColor(lineColor)
        } else if (timeInterval === '3M') {
            setYearColor("#353535")
            setOneMonthColor("#353535")
            setThreeMonthColor(lineColor)
            setSixMonthColor("#353535")
        } else if (timeInterval === '1M') {
            setYearColor("#353535")
            setOneMonthColor(lineColor)
            setThreeMonthColor("#353535")
            setSixMonthColor("#353535")
        }

    }, [timeInterval, stockData, lineColor, yearColor, oneMonthColor, threeMonthColor, sixMonthColor, ticker_symbol])

    const dateFunc = (date) => {
        if(date == '1Y') {
            setPast('Past Year')
            setTimeInterval('1Y')
            setDateRange(stockData)
        } else if (date == '6M') {
            setPast('Past 6 Months')
            setTimeInterval('6M')
            setDateRange(stockData.slice((stockData.length) / 2))
        } else if (date == '1M') {
            setPast('Past Month')
            setTimeInterval('1M')
            setDateRange(stockData.slice(((stockData.length) / 12) * 11))
        } else if (date == '3M') {
            setPast('Past 3 Months')
            setTimeInterval('3M')
            setDateRange(stockData.slice(((stockData.length) / 4) * 3))
        }

    }
    if(!stockData) return null


    // handle mouse over graph
    const handleMouseOver = (price) => {
        setCurrentPrice(price?.toFixed(2))
        // condition on state of dateRange
        setCurrentChange( Math.abs( (price - stockData[0].price).toFixed(2) ) )
        // calc percent change
        if (stockData[(stockData?.length) -1].price > stockData[0].price) {
          setCurrentPercentChg( Math.abs((((stockData[0].price - price) / price)*100).toFixed(5)))
        } else {
          setCurrentPercentChg( Math.abs( (((price - stockData[0].price) / stockData[0].price)*100).toFixed(2) ) )
        }
        //set sign
        if (dateRange ? dateRange[0]['price'] < dateRange[dateRange.length -1]['price'] : stockData[(stockData?.length) -1].price > stockData[0].price) {
          setSign('+')
        } else {
          setSign('-')
        }

    }

    const watchlist_arr = Object.values(watchlists)

    const Dropdown = () => (
        <div className="watchlists-container">
            <div className='watchlists-list'>
            {watchlist_arr.map((watchlist) => (
                <a href={`/watchlists/${watchlist.watchlist.id}`}>
                    <div className="watchlist">
                        <label className='choice-container'>
                            <input type="radio" checked={checked === watchlist?.watchlist.id} onChange={() => [setChoiceMade(true), setChecked(watchlist?.watchlist.id)]} name="watchlist"></input>
                            <span id='radio-label'>{watchlist?.watchlist.watchlist_name}</span>
                        </label>
                    </div>
                </a>
            ))}
            </div>

            <button id='save-button' disabled={!choiceMade} onClick={addToWatchlist}>Save Changes</button>
            <button id='cancel-button' onClick={() => setShowDropdown(false)}>Cancel</button>
        </div>
    )

    const addToWatchlist = async(e) => {
        setShowDropdown(false)
        let watchlistId = checked;
        let asset = stockOverview?.id
        await dispatch(addAssetWatchlist(asset, watchlistId))
    }

    return (
        <div id='outer'>
            <div id='stock-page-container'>

                <div id='left-column-container'>
                    <div id='stock-graph-container'>
                       <div className='stock-ticker-container'>
                            <h1 className='company-name'>{stockOverview?.company_name}</h1>
                            <div id="ticker">
                                    <h1 id="">${currentPrice ? currentPrice : (stockData[(stockData?.length)-1]['price']).toFixed(2)}</h1>
                            </div>
                            <div id='ticker-change'>
                                <p>{`${sign ? sign : stockData[(stockData?.length) -1].price > stockData[0].price ? '+' : '-'}$${ currentChange ? currentChange.toFixed(2) : Math.abs( (stockData[(stockData?.length) -1].price - stockData[0].price).toFixed(2) )}
                                (${sign ? sign : stockData[(stockData?.length) -1].price > stockData[0].price ? '+' : '-'}${currentPercentChg ? currentPercentChg.toFixed(5) : Math.abs( (((stockData[0].price - stockData[(stockData?.length) -1].price)/ stockData[(stockData?.length) -1].price) * 100).toFixed(5) )  }%)`}
                                { past ? past : 'Past Year'}
                                </p>
                            </div>

                        </div>
                        <LineChart width={800} height={250} data={dateRange ? dateRange : stockData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          onMouseMove={(e) => handleMouseOver(e.activePayload ? e?.activePayload[0].payload.price : stockData[(stockData.length)-1].price)}
                          >
                          <XAxis dataKey="date" hide={true} />
                          <YAxis dataKey="price" domain={['auto', 'auto']} hide={true} />
                          <Tooltip />
                          <Line type="monotone" dataKey="price" stroke={lineColor} strokeWidth={1.5} dot={false} />
                        </LineChart>
                        <div id='stock-graph-btns'>
                            <div>
                                <button style={{color: oneMonthColor}} type='button' value='1M' onClick={(e) => dateFunc(e.target.value)}>1M</button>
                            </div>
                            <div>
                                <button style={{color: threeMonthColor}} type='button' value='3M' onClick={(e) => dateFunc(e.target.value)}>3M</button>
                            </div>
                            <div>
                                <button style={{color: sixMonthColor}} type='button' value='6M' onClick={(e) => dateFunc(e.target.value)}>6M</button>
                            </div>
                            <div>
                                <button style={{color: yearColor}} type='button' value='1Y' onClick={(e) => dateFunc(e.target.value)}>1Y</button>
                            </div>
                        </div>

                    </div> {/* end of stock-graph-container */}

                    <div id='stock-specific-info'>
                        <div id='about-stock'>
                            <h4>About</h4>
                            <p>{stockOverview?.description}</p>
                            <table className='about-stock-table'>
                                <thead>
                                    <tr>
                                        <th>CEO</th>
                                        <th>Employees</th>
                                        <th>Headquarters</th>
                                        <th>Founded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{stockOverview?.ceo}</td>
                                        <td>{stockOverview?.employees}</td>
                                        <td>{stockOverview?.headquarters}</td>
                                        <td>{stockOverview?.founded}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div id='key-stats'>
                            <h4>Key Statistics</h4>
                            <table className='key-stats-table'>
                                <thead>
                                    <tr>
                                        <th>Market Cap</th>
                                        <th>Price-Earnings Ratio</th>
                                        <th>Dividend Yield</th>
                                        <th>Average Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{stockOverview?.market_cap}</td>
                                        <td>{stockOverview?.price_earning_ratio}</td>
                                        <td>{stockOverview?.dividend_yield}</td>
                                        <td>{stockOverview?.average_volume}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div> {/* end key-stats /*/}
                        <News ticker_symbol={ticker_symbol} />
                    </div> {/* end of stock-specific-info */}

                </div> {/* end of left-column-container */}

                <div className='buy-sell-container'>
                    <div className='fixed-container'>
                        <section className='buy-sell'>
                            <div id='tabs'>
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
                        </section>
                        <section className='watchlist-dropdown'>
                            { showDropdown ? <Dropdown/> : <button id='add-to-list' onClick={onClick}><span id='add-plus'>+  </span ><span id='add-txt'>Add to Lists</span></button>}
                        </section> {/* end watchlist-dropdown-container */}
                    </div>

                </div> {/* end of .buy-sell-container */}

            </div>
        </div>

    )
}

export default Stock;


// dateRange ? dateRange[0]["price"] > dateRange[(dateRange.length) - 1]["price"] ? "#dc436f" : "#97ef0c" : stockData[0]["price"] > stockData[(stockData.length) - 1]["price"] ? "#dc436f" : "#97ef0c"
