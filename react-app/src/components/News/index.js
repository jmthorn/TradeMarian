import React, { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { stockNews, genNews } from "../../store/news"

import './news.css';


const News = (props) => { //{ticker_symbol:AAPL}

    // const stock_news = useSelector(state => state.news.stock_news)
    const gen_news = useSelector(state => state?.news?.gen_news)
    const dispatch = useDispatch()

    useEffect(async() => { 
        if(props.ticker_symbol) { 
            // await dispatch(stockNews(props.ticker_symbol))
        } else { 
            await dispatch(genNews())
        }
    }, [])

    let newsArray = []
    const news = () => { 
        if (props.ticker_symbol) { 
            return(
                <div>
                    
                </div>
            )
        } else {  
            for (const article in gen_news) { 
                newsArray.push(
                    <div className="article-container">
                        <div className="article-information">
                            <h3>{gen_news[article].title}</h3>
                            <h2>{gen_news[article].title}</h2>
                        </div>
                        <div className="article-photo">
                            <img src={gen_news[article].urlToImage} alt="news_story"></img>
                        </div>
                    </div>
                )
            }
        }
        return newsArray;
    }


    return (
        <>
            <h1>News</h1>
            {news()}
        </>
    )
}


export default News