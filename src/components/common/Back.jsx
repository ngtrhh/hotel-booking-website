import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Back = () => {
  return (
    <Link to={'/results'}>
      <div className="back">
        <BsChevronLeft size={24} className="back__icon" />
        <span>Trở về</span>
      </div>
    </Link>
  );
};

export default Back;
