import React from 'react'
import SearchBar from '../components/common/Results/SearchBar'
import Filter from '../components/common/Results/Filter'

const Results = () => {
  return (
    <div className="results">
      <SearchBar/>
      <div className="results__body">
        container
        <Filter/>
      </div>
    </div>
  )
}

export default Results