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

const Filter = () => {
  return (
    <div className="filter">
        <div className="container">
            <div className="filter__header">
                <div className="filter__header__title">
                    Kết quả bộ lọc
                </div>
            </div>
            <div className="filter__content"></div>
        </div>
    </div>
  );
};

export default Filter;
