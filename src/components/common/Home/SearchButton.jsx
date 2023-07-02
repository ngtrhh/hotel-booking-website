import React from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";

const SearchButton = (props) => {
  const navigate = useNavigate();
  return (
    <Link to="/results">
      <div className="button cyan">
        <BsSearch size={40} />
      </div>
    </Link>
    
  );
};

export default SearchButton;
