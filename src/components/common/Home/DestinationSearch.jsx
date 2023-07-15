import React, { useState, useRef, useEffect, useContext } from "react";
import { BsGeoAlt, BsXLg } from "react-icons/bs";
import { AppContext } from "../../../Context/AppProvider";

const DestinationSearch = () => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if(provinces.length){
      console.log(provinces);
      const updatedProvinces = provinces.map(province =>{
        const fields = "photo";
        const input = province?.name || '';
        const inputType = "textquery";
        const apiKey = "AIzaSyDxz1hTaL3_1jqgbWWiZA_kJG0c9mLZWY0";

        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=${fields}&input=${input}&inputtype=${inputType}&key=${apiKey}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // Xử lý dữ liệu trả về
            console.log(data);
            const photoReference = data.candidates[0].photos[0].photo_reference;
            const imageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

            // Trả về object mới với thuộc tính imageURL
            return {
              ...province,
              imageURL: imageURL,
            };
          })
          .catch(error => {
            // Xử lý lỗi
            console.error(error);
          });
      });
      setProvince(updatedProvinces);
    }
  }, [provinces]);
  // const data = [
  //   { name: "Apple" },
  //   { name: "Orange" },
  //   { name: "Banana" },
  //   { name: "Cherry" },
  // ];
  const {searchPlaceValue, setSearchPlaceValue} = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  // const [reccently, setRecently] = useState(data);

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
    // const query = e.target.value;
    // var updatedList = [...reccently];
    // updatedList = updatedList.filter((item) => {
    //   return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    // });
    setSearchPlaceValue(e.target.value);
    // setRecently(updatedList);
    // if (e.target.value != "") setCanDelete(true);
    // else setCanDelete(false);
  };

  const handleClear = () => {
    setCanDelete(false);
    setSearchPlaceValue("");
    //setRecently(data);
    inputRef.current && inputRef.current.focus();
  };

  return (
    <div
      className="input"
      ref={ref}
      onClick={(e) => {
        if(!isOpen){
          setIsOpen(true);
        }
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
        <div id="dropdown" style={{overflowY: 'auto'}}>
          <div className="title">Danh sách tỉnh thành</div>
          {provinces.map((item, index) => {
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
