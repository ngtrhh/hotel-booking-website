import React, { useState, useCallback, useEffect, useRef } from "react";
import { BsPeople } from "react-icons/bs";
import ItemOfGuest from "./ItemOfGuest";

const NumberOfGuestSearch = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [guest, setGuest] = useState(2);
  const [child, setChild] = useState(0);

  const ref = useRef();

  const handleGetData = (value) => {
    // console.log("value:", value);
    if (Object.keys(value)[0] == "rooms") setRooms(value.rooms);
    else if (Object.keys(value)[0] == "guest") setGuest(value.guest);
    else setChild(value.child);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div
      className="input pointer"
      onClick={(e) => {
        setIsOpen(true);
      }}
    >
      {!props.type === "detail" && (
        <>
          <div className="icon">
            <BsPeople size={28} />
          </div>
        </>
      )}
      <div className="input__content">
        <div className="label">Khách và phòng</div>
        <input
          readOnly
          placeholder="2 người - 1 phòng"
          style={{ width: "220px" }}
          value={
            child > 0
              ? `${guest} người - ${child} trẻ em - ${rooms} phòng`
              : `${guest} người - ${rooms} phòng`
          }
        />
      </div>
      {isOpen && (
        <div id="guest-dropdown" ref={ref}>
          <ItemOfGuest
            name="guest"
            min={1}
            title="Người lớn"
            getValue={handleGetData}
          />
          <ItemOfGuest
            name="child"
            min={0}
            title="Trẻ em"
            getValue={handleGetData}
          />
          <ItemOfGuest
            name="rooms"
            min={1}
            title="Phòng"
            getValue={handleGetData}
          />
        </div>
      )}
    </div>
  );
};

export default NumberOfGuestSearch;
