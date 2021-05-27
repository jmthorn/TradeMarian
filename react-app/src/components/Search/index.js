import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockSearch } from "../../store/search";

const Search = () => {
  const stocks = useSelector(state => state.search.searchInfo);
  console.log('==========searchstocks', stocks)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stockSearch(stocks))
  }, [dispatch, stocks])

  return (
    <div>
      <form action="" method='post'>
        <input type="text" placeholder='Search' />
      </form>
    </div>
  )
}

export default Search;