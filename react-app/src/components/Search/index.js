import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockSearch } from "../../store/search";
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stocks = useSelector(state => state.search.searchInfo);
  // console.log('==========searchstocks', stocks)
  const tickerSymbols = stocks.stock_names?.map(stock => (stock['ticker_symbol']))
  const companyNames = stocks.stock_names?.map(stock => (stock['company_name']))

  console.log('--------------------', tickerSymbols)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = e => {
    // e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(stockSearch());
  }, [dispatch])

  useEffect(() => {
    const results = tickerSymbols?.filter(symbol => symbol.toLowerCase().match(searchTerm));
    if (!results) setSearchTerm("");
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div id='search-component'>
      <input
        type="text"
        placeholder='Search'
        onFocus={useEffect(() => {
          dispatch(stockSearch())
        }, [dispatch])}
        onChange={handleChange}
        value={searchTerm} />
      <ul>
        {searchResults && searchResults.map(item => (
          <div className='stock-search-items' onClick={e => {
            e.preventDefault();
            setSearchResults([]);
            setSearchTerm("");
            history.push(`/stocks/${item}`);
          }}>
            {searchResults && <NavLink to={`/stocks/${item}`}>{item}</NavLink>}
          </div>
        ))}
        {!searchResults && <div></div>}
      </ul>
    </div>
  )
}

export default Search;