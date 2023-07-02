import React, { useState, useRef, useEffect } from "react";
import NumberOfGuestSearch from "./NumberOfGuestSearch";
import SearchButton from "./SearchButton";
import Calendar from "./Calendar";
import DestinationSearch from "./DestinationSearch";
import Button from "../Button";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const type = props.type ? props.type : "home";
  return (
    <div className="search-bar" style={{zIndex : 999}}>
      <div className="container">
        {type !== "detail" ? (
          <>
            <DestinationSearch /> <hr className="line" />
          </>
        ) : null}
        <Calendar type={type} />
        <hr className="line" />
        <NumberOfGuestSearch type={type} />
        {type !== "detail" && <SearchButton onClick={navigate('/results')} />}
      </div>
      {type === "detail" && (
        <Button className="cyan" preIcon={() => <BsSearch size={20} />}>
          Cập nhật
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
