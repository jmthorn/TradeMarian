import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockSearch } from "../../../store/search";
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stocks = useSelector(state => state.search.searchInfo);

  const tickerSymbols = stocks.stock_names?.map(stock => (stock['ticker_symbol']))
  const companyNames = stocks.stock_names?.map(stock => (stock['company_name']))
  const names = tickerSymbols?.map((tickerSymbol, companyName) => {
    return `${tickerSymbol}: ${companyNames[companyName]}`
  })

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    const results = names?.filter(symbol => symbol.toLowerCase().includes(searchTerm.split(" ").join("")));
    if (!results) setSearchTerm("");

    setSearchResults(results);
  }, [searchTerm]);
  
  return (
    <div id='search-component'>
      <input
        type="text"
        placeholder='Search'
        onFocus={useEffect(() => {
          setSearchTerm(" ");
          dispatch(stockSearch())
        }, [dispatch])}
        onChange={handleChange}
        onClick={() => {
          setSearchTerm("");
          setSearchResults([]);
        }}
        value={searchTerm} />
        <ul>
          {searchResults?.map(item => (
            <div className='stock-search-items' onClick={() => {
              setSearchTerm(" ");
              history.push(`/stocks/${item.split(":")[0]}`);
            }}>
              <NavLink to={`/stocks/${item.split(":")[0]}`}>{item}</NavLink>
            </div>
          ))}
        </ul>
    </div>
  )
}

export default Search;