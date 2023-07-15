import React from "react";
import SearchBar from "../components/common/Results/SearchBar/SearchBar";
import Filter from "../components/common/Results/FilterBar/Filter";
import RoomList from "../components/common/Results/RoomList/RoomList";
import Helmet from "../components/common/Helmet";

export const Results = () => {
  return (
    <Helmet title="Kết quả tìm kiếm">
      <div className="results">
        {/* Thanh searchbar */}
        <div className="results__search-bar-container">
          <SearchBar />
        </div>

        {/* Body */}
        <div className="results__body">
          <div className="results__body__container">
            <div className="results-filter-container">
              <Filter />
            </div>
            <div className="results-roomlist-container">
              <RoomList />
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
