import React, { useState, useEffect, useRef, useContext } from "react";
import { BsCalendar2 } from "react-icons/bs";
import { DateRange } from "react-date-range";
import { format, addDays, differenceInDays } from "date-fns";
import vi from "date-fns/locale/vi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AppContext } from "../../../Context/AppProvider";

const Calendar = (props) => {
  const dataProvided = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const range = dataProvided.searchDateRange;
  const setRange = dataProvided.setSearchDateRange;

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div
      id="calendar-dropdown"
      onClick={(e) => {
        setIsOpen(true);
      }}
    >
      <div className="input pointer">
        {!props.type === "detail" && (
          <>
            <div className="icon">
              <BsCalendar2 size={28} />
            </div>
          </>
        )}
        <div className="input__content">
          <div className="label">Nhận phòng</div>
          <input
            readOnly
            placeholder="Chọn ngày"
            value={`${format(range[0].startDate, "eee, dd-MM-yyyy", {
              locale: vi,
            })}`}
            style={{ width: "160px" }}
          />
        </div>
      </div>
      <hr className="line" />
      <div className="input pointer">
        {!props.type === "detail" && (
          <>
            <div className="icon">
              <BsCalendar2 size={28} />
            </div>
          </>
        )}
        <div className="input__content">
          <div className="label">Trả phòng</div>
          <input
            readOnly
            placeholder="Chọn ngày"
            value={`${format(range[0].endDate, "eee, dd-MM-yyyy", {
              locale: vi,
            })}`}
            style={{ width: "160px" }}
            onClick={() => {
              setIsOpen(true);
            }}
          />
        </div>
      </div>
      <div ref={ref}>
        {isOpen && (
          <DateRange
            className="date-range"
            locale={vi}
            ranges={range}
            rangeColors={["#272b4e"]}
            onChange={(item) => {
              setRange([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            minDate={new Date()}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
