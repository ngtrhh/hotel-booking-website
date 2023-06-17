import React from "react";
import InputSearch from "./InputSearch";
import { BsGeoAlt, BsCalendar2, BsPeople } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="container">
        <InputSearch
          icon={() => {
            return <BsGeoAlt size={24} />;
          }}
          label="Địa điểm"
          placeholder="Nhập tên thành phố, điểm đến hoặc tên khách sạn"
          width="400px"
        />
        <hr className="line" />
        <InputSearch
          icon={() => {
            return <BsCalendar2 size={24} />;
          }}
          label="Nhận phòng"
          placeholder="Chọn ngày"
          width="160px"
        />
        <hr className="line" />
        <InputSearch
          icon={() => {
            return <BsCalendar2 size={24} />;
          }}
          label="Trả phòng"
          placeholder="Chọn ngày"
          width="160px"
        />
        <hr className="line" />
        <InputSearch
          icon={() => {
            return <BsPeople size={24} />;
          }}
          label="Khách và phòng"
          placeholder="2 người - 1 phòng"
          width="200px"
        />
      </div>
    </div>
  );
};

export default SearchBar;
