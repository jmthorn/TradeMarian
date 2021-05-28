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
  // const [dropDown, setDropDown] = useState(false)

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   setDropDown(true);
  // }, [dropDown])

  useEffect(() => {
    const results = names?.filter(symbol => symbol.toLowerCase().includes(searchTerm.split(" ").join("")));

    setSearchResults(results);
  }, [searchTerm]);

  return (
    <div id='search-component'>
      <input
        type="text"
        placeholder='Search'
        onFocus={useEffect(() => {
          // setDropDown(true);
          setSearchTerm("");
          dispatch(stockSearch())
        }, [dispatch])}
        onChange={handleChange}
        // onBlur={() => {
          // setDropDown(false);
          // setSearchTerm(searchTerm);
          // setSearchResults([]);
        // }}
        onClick={() => {
          setSearchTerm("");
          setSearchResults([]);
        }}
        value={searchTerm} />
      <div id='search-results'>
        <ul>
          {/*dropDown && */searchResults?.map(item => (
            <div className='stock-search-items'
              onClick={() => {
                setSearchTerm("-");
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