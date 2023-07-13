import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { BsSearch } from "react-icons/bs";
import { HorizontalCard } from "../components/common/BookingHistory/HorizontalCard";
import { AppContext } from "../Context/AppProvider";

export const BookingHistory = () => {
  const data = useContext(AppContext);
  const {accoms, orders, user} = data;
  const [dataToShow, setDataToShow] = useState([]);
  const [sortOption, setSortOption] = useState([
    {
      name: 'nearest',
      selected: true,
    },
    {
      name: 'oldest',
      selected: false,
    },
    {
      name: 'highestPrice',
      selected: false,
    },
    {
      name: 'lowestPrice',
      selected: false,
    }
  ]);

  useEffect(() =>{
    const newDataToShow = orders.map((order) => {
      const correspondingAccom = accoms.find((accom) => accom.accomId === order.accomId);
      if (correspondingAccom) {
        return { ...order, ...correspondingAccom, 
          accomsName: correspondingAccom.name};
      }
      return order;
    });
    setDataToShow(newDataToShow);
  }, [accoms, orders, user]);

  const handleSortOptionClick = (index) => {
    const updatedSortOption = [...sortOption];
    updatedSortOption.forEach((option, i) => {
      option.selected = i === index;
    });
    setSortOption(updatedSortOption);
  };

  useEffect(() =>{
    handleSortOptionClick(0);
  }, [dataToShow]);

  useEffect(() =>{
    const option = sortOption.find(opt => opt.selected == true);
    
    if(option.name == 'nearest'){
      handleSortOptionClick(0);
      dataToShow.sort((a, b) => b.orderDate - a.orderDate);
    }
    else if(option.name == 'oldest'){
      handleSortOptionClick(1);
      dataToShow.sort((a, b) => a.orderDate - b.orderDate);
    }
    else if(option.name == 'highestPrice'){
      handleSortOptionClick(2);
      dataToShow.sort((a, b) => b.orderPrice - a.orderPrice);
    }
    else if(option.name == 'lowestPrice'){
      handleSortOptionClick(3);
      dataToShow.sort((a, b) => a.orderPrice - b.orderPrice);
    }
  }, [sortOption, dataToShow, accoms]);
  
  
  return (
    <div className="booking-history">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Lịch sử đặt phòng</Breadcrumb.Item>
      </Breadcrumb>
      <div className="search-bar">
        <div className="search-bar__input-wrapper">
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              TÊN CHỖ NGHỈ
            </div>
            <input placeholder="Nhập tên chỗ nghỉ, địa điểm" />
          </div>
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              Ngày Nhận phòng
            </div>
            <input placeholder="Chọn ngày" readOnly />
          </div>
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              Ngày Trả Phòng
            </div>
            <input placeholder="Chọn ngày" readOnly />
          </div>
        </div>
        <Button className="cyan" preIcon={() => <BsSearch size={20} />}>
          Tìm kiếm
        </Button>
      </div>

      <div className="two-contents">
        <div className="side-menu">
          <div className="item selected">Đặt phòng sắp đến</div>
          <div className="item">Đặt phòng đã qua</div>
          <div className="item">Đặt phòng đã hủy</div>
        </div>

        <div className="side-main">
          <div className="sort">
            <div className="sort__title">Sắp xếp theo</div>
            <div className="sort__wrapper">
            <div
              className={`sort__wrapper__item ${sortOption[0].selected ? 'selected' : ''}`}
              onClick={() => handleSortOptionClick(0)}
            >
              Gần nhất
            </div>
            <div
              className={`sort__wrapper__item ${sortOption[1].selected ? 'selected' : ''}`}
              onClick={() => handleSortOptionClick(1)}
            >
              Cũ nhất
            </div>
            <div
              className={`sort__wrapper__item ${sortOption[2].selected ? 'selected' : ''}`}
              onClick={() => handleSortOptionClick(2)}
            >
              Giá cao nhất
            </div>
            <div
              className={`sort__wrapper__item ${sortOption[3].selected ? 'selected' : ''}`}
              onClick={() => handleSortOptionClick(3)}
            >
              Giá thấp nhất
            </div>

            </div>
          </div>
          <div className="list">
            {dataToShow.map((bookingHistory) => {
              return (<HorizontalCard DataToShow={bookingHistory} type="history" state="passed" />)
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
