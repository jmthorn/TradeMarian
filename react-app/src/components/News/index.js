import React, { useEffect, useReducer } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { stockNews, genNews } from "../../store/news"

import './news.css';


const News = (props) => { //{ticker_symbol:AAPL}

    const stock_news = useSelector(state => state.news.stock_news)
    const gen_news = useSelector(state => state?.news?.gen_news)
    const dispatch = useDispatch()

    useEffect(async() => { 
        if(props.ticker_symbol) { 
            await dispatch(stockNews(props.ticker_symbol))
        } else { 
            await dispatch(genNews())
        }
    }, [])

    let newsArray = []
    const news = () => { 
        if (props.ticker_symbol) { 
                for (const article in stock_news) { 
                    newsArray.push(
                        <a href={stock_news[article].url}>
                            <div key={article} className="article-container">
                                <div className="article-information">
                                    <h3>{stock_news[article].source.name}</h3>
                                    <h2>{stock_news[article].title}</h2>
                                    <div>{stock_news[article].author}</div>
                                </div>
                                <div className="article-photo">
                                    <img src={stock_news[article].urlToImage} alt="news_story"></img>
                                </div>
                                <span className="portfolio-line"></span>
                            </div>
                        </a>
                    )  
                }  
        } else {  
            for (const article in gen_news) { 
                newsArray.push(
                    <a href={gen_news[article].url}>
                        <div key={article} className="article-container">
                            <div className="article-information">
                                <h3>{gen_news[article].source.name}</h3>
                                <h2>{gen_news[article].title}</h2>
                                <div>{gen_news[article].author}</div>
                            </div>
                            <div className="article-photo">
                                <img src={gen_news[article].urlToImage} alt="news_story"></img>
                            </div>
                            <span className="portfolio-line"></span>
                        </div>
                    </a>
                )
            }
        }
        return newsArray;
    }


    return (
        <>
            <div className="news-container">
                <h1>News</h1>
                <span className="portfolio-line"></span>
                {news()}
            </div>
        </>
    )
}


export default News
