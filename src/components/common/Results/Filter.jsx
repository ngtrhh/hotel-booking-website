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
import PaymentFilter from "./PaymentFilter";
import BedTypeFilter from "./BedTypeFilter";
import StarFilter from "./StarFilter";
import RatingFilter from "./RatingFilter";
import { Alert } from "antd";

const Filter = () => {
  const HandlResetFilter = () =>{
    alert("Ehehe 😂");
  };
  return (
    <div className="results__filter">
        <div className="container">
            <div className="results__filter__header">
                <div className="results__filter__header__title">
                    Kết quả bộ lọc
                </div>
                <a onClick={HandlResetFilter} className="results__filter__header__reset">
                  Đặt lại
                </a>
            </div>
            <div className="results__filter__content">
                <PriceFilter/>
                <CommonFilter/>
                <StarFilter/>
                <RatingFilter/>
                <AccommodationTypeFilter/>
                <Facility/>
                <PaymentFilter/>
                <BedTypeFilter/>
            </div>
        </div>
    </div>
  );
};

export default Filter;
