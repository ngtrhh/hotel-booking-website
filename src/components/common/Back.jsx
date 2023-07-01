import React from "react";
import { BsChevronLeft } from "react-icons/bs";

const Back = () => {
  return (
    <div className="back">
      <BsChevronLeft size={24} className="back__icon" />
      <span>Trở về</span>
    </div>
  );
};

export default Back;
