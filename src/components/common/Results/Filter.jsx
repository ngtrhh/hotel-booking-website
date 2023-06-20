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
import PriceFilter from "./PriceFilter";
import CommonFilter from "./CommonFilter";
import AccommodationTypeFilter from "./AccommodationTypeFilter";
import Facility from "./Facility";

const Filter = () => {
  return (
    <div className="results__filter">
        <div className="container">
            <div className="results__filter__header">
                <div className="results__filter__header__title">
                    Kết quả bộ lọc
                </div>
                <a herf=""className="results__filter__header__reset">
                  Đặt lại
                </a>
            </div>
            <div className="results__filter__content">
                <PriceFilter/>
                <CommonFilter/>
                <AccommodationTypeFilter/>
                <Facility/>
                
            </div>
        </div>
    </div>
  );
};

export default Filter;
