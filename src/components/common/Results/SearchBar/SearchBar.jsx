import React, { useContext } from "react";
import Logo from "../../Logo";
import Button from "../../Button";
import { format, addDays, differenceInDays } from "date-fns";
import vi from "date-fns/locale/vi";
import {
  BsGeoAltFill,
  BsMailbox,
  BsTelephone,
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsSendFill,
  BsCalendar2,
  BsSearch,
  BsCalendar2MinusFill,
  BsPeopleFill,
} from "react-icons/bs";
import { AppContext } from "../../../../Context/AppProvider";

const SearchBar = () => {
  const dataProvided = useContext(AppContext);
  const {
    searchPlaceValue,
    setSearchPlaceValue,
    searchDateRange,
    setSearchDateRange,
    seacrchNumOfRooms,
    setSeacrchNumOfRooms,
    seacrchNumOfGuest,
    setSeacrchNumOfGuest,
    seacrchNumOfChild,
    setSeacrchNumOfChild,
  } = dataProvided;
  return (
    <div className="results__search-bar">
      <div className="container">
        <div className="items">
          <div className="item">
            <BsGeoAltFill size={24} className="icon" />
            <div className="content">
              <div className="field">Địa điểm</div>
              <div className="value">{searchPlaceValue}</div>
            </div>
          </div>

          <div className="item">
            <BsCalendar2MinusFill size={24} className="icon" />
            <div className="content">
              <div className="field">Nhận phòng</div>
              <div className="value">
                {`${format(searchDateRange[0].startDate, "eee, dd-MM-yyyy", {
                  locale: vi,
                })}`}
              </div>
            </div>
          </div>

          <div className="item">
            <BsCalendar2MinusFill size={24} className="icon" />
            <div className="content">
              <div className="field">Trả phòng</div>
              <div className="value">{`${format(
                searchDateRange[0].endDate,
                "eee, dd-MM-yyyy",
                {
                  locale: vi,
                }
              )}`}</div>
            </div>
          </div>

          <div className="item">
            <BsPeopleFill size={24} className="icon" />
            <div className="content">
              <div className="field">Khách</div>
              <div className="value">
                {seacrchNumOfChild > 0
                  ? `${seacrchNumOfGuest} người - ${seacrchNumOfChild} trẻ em `
                  : `${seacrchNumOfGuest} người`}
              </div>
            </div>
          </div>
        </div>
        <Button preIcon={BsSearch} className="btn-search cyan">
          Tìm ngay
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
