import React from "react";
import SearchBar from "../components/common/Results/SearchBar";
import Filter from "../components/common/Results/Filter";

export const Results = () => {
  return (
    <div className="results">
      <div className="results__search-bar-container">
        <SearchBar />
      </div>

      <div className="results__body">
        <div className="results__body__container">
          <div className="filter-container">
            <Filter />
          </div>
          {/* <div>Danh sách các phòng</div> */}
        </div>
      </div>
    </div>
  );
};
