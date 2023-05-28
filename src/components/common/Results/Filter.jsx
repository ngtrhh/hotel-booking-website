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

const Filter = () => {
  return (
    <div className="results__filter">
        <div className="container">
            <div className="results__filter__header">
                <div className="results__filter__header__title">
                    Kết quả bộ lọc
                </div>
                <div className="results__filter__header__reset">
                  Đặt lại
                </div>
            </div>
            <div className="results__filter__content">
                <PriceFilter/>
                
            </div>
        </div>
    </div>
  );
};

export default Filter;
