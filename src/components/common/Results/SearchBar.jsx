import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import {
  BsGeoAlt,
  BsMailbox,
  BsTelephone,
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsSendFill,
  BsCalendar2
} from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="results__search-bar">
      <div className="container">
        <div className="items">
          <div className="item">
            <BsGeoAlt size={24} className="icon"/>
            <div className="content">
              <div className="field">Địa điểm</div>
              <div className="value">HCM</div>
            </div>
          </div>

          <div className="item">
            <BsCalendar2 size={24} className="icon"/>
            <div className="content">
              <div className="field">Nhận phòng</div>
              <div className="value">T7, 8 tháng 4</div>
            </div>
          </div>

          <div className="item">
            <BsGeoAlt size={24} className="icon"/>
            <div className="content">
              <div className="field">Trả phòng</div>
              <div className="value">CN, 9 tháng 4</div>
            </div>
          </div>

          <div className="item">
            <BsGeoAlt size={24} className="icon"/>
            <div className="content">
              <div className="field">Khách và phòng</div>
              <div className="value">2 người - 1 phòng</div>
            </div>
          </div>
        </div>
        <Button text="Tìm ngay" className="btn-search cyan" />
      </div>
    </div>
  );
};

export default SearchBar;
