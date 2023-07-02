import React, { useState, useRef, useEffect, useContext } from "react";
import { BsGeoAlt, BsXLg } from "react-icons/bs";
import { AppContext } from "../../../Context/AppProvider";

const DestinationSearch = () => {
  const data = [
    { name: "Apple" },
    { name: "Orange" },
    { name: "Banana" },
    { name: "Cherry" },
  ];
  const {searchPlaceValue, setSearchPlaceValue} = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [reccently, setRecently] = useState(data);

  const ref = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleFilter = (e) => {
    const query = e.target.value;
    var updatedList = [...reccently];
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearchPlaceValue(e.target.value);
    setRecently(updatedList);
    if (e.target.value != "") setCanDelete(true);
    else setCanDelete(false);
  };

  const handleClear = () => {
    setCanDelete(false);
    setSearchPlaceValue("");
    setRecently(data);
    inputRef.current && inputRef.current.focus();
  };

  return (
    <div
      className="input"
      ref={ref}
      onClick={(e) => {
        setIsOpen(true);
        inputRef.current && inputRef.current.focus();
      }}
    >
      <div className="icon">
        <BsGeoAlt size={28} />
      </div>
      <div className="input__content">
        <div className="label">Địa điểm</div>
        <input
          placeholder="Nhập tên thành phố hoặc tên khách sạn"
          value={searchPlaceValue}
          style={{ width: "312px" }}
          onChange={handleFilter}
          ref={inputRef}
        />
      </div>
      <BsXLg
        size={16}
        className="delete"
        onClick={handleClear}
        style={{ visibility: canDelete ? "visible" : "hidden" }}
      />
      {isOpen && (
        <div id="dropdown">
          <div className="title">Tìm kiếm gần đây</div>
          {reccently.map((item, index) => {
            return (
              <div
                key={index}
                className="item"
                onClick={() => {
                  setSearchPlaceValue(item.name);
                  setIsOpen(false);
                  setCanDelete(true);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DestinationSearch;
