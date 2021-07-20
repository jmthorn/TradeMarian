import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockSearch } from "../../../store/search";
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stocks = useSelector(state => state.search.searchInfo);

  const tickerSymbols = stocks.stock_names?.map(stock => (stock['ticker_symbol']));
  const companyNames = stocks.stock_names?.map(stock => (stock['company_name']));

  const names = tickerSymbols?.map((tickerSymbol, companyName) => {
    return `${tickerSymbol}: ${companyNames[companyName]}`
  })

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = names?.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

    setSearchResults(results);

    if (!results || searchTerm === '') {
      setSearchResults('')
    }
  }, [searchTerm]);

  return (
    <div id='search-component'>
      <input
        type="text"
        placeholder='Search'
        onFocus={useEffect(() => {
          dispatch(stockSearch())
        }, [dispatch])}
        onChange={e => setSearchTerm(e.target.value)}
        onBlur={() => setSearchResults('')}
        value={searchTerm} />
      <div id='search-results'>
        <ul>
          {searchResults.length > 0 && searchResults.map(item => (
            <div className='stock-search-items'
              onMouseDown={() => {
                setSearchTerm('')
                history.push(`/stocks/${item.split(":")[0]}`);
              }}
            >
              <NavLink to={`/stocks/${item.split(":")[0]}`}>{item}</NavLink>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search;