import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Back = () => {
  function goBack() {
    window.history.back();
  }

  return (
    <div onClick={goBack} className="back">
      <BsChevronLeft size={24} className="back__icon" />
      <span>Trở về</span>
    </div>
  );
};

export default Back;
