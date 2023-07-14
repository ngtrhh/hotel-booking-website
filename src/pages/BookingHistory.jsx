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
  const [sortedData, setSortedData] = useState(dataToShow);
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
  const [roomStateShow, setRoomStateShow] = useState('coming');

  useEffect(() =>{
    let newDataToShow = orders.map((order) => {
      const correspondingAccom = accoms.find((accom) => accom.accomId === order.accomId);
      if (correspondingAccom) {
        return { ...order, ...correspondingAccom, 
          accomsName: correspondingAccom.name};
      }
      return order;
    });
    newDataToShow = newDataToShow.map(data =>{
      if(!data.canceled){
        if(Date.now() < data.recvDate.toDate()){
          return {
            ...data,
            state: 'coming'
          }
        }
        else{
          return {
            ...data,
            state: 'passed'
          }
        }
      }
      else{
        return {
          ...data,
          state: 'canceled'
        }
      }
    });
    setDataToShow(newDataToShow);
  }, [accoms, orders, user]);

  useEffect(() =>{
    console.log(dataToShow);
  }, [dataToShow]);

  const handleSortOptionClick = (index) => {
    const updatedSortOption = [...sortOption];
    updatedSortOption.forEach((option, i) => {
      option.selected = i === index;
    });
    setSortOption(updatedSortOption);
  };

  const HandleChangeStateView = (newState) => {
    setRoomStateShow(newState);
  };

  useEffect(() =>{
    const option = sortOption.find(opt => opt.selected == true);
    if(dataToShow.length){
      let tempData = [...dataToShow];
      if(option.name === 'nearest'){
        tempData.sort((a, b) => b.orderDate - a.orderDate);
      }
      else if(option.name === 'oldest'){
        tempData.sort((a, b) => a.orderDate - b.orderDate);
      }
      else if(option.name === 'highestPrice'){
        tempData.sort((a, b) => b.orderPrice - a.orderPrice);
      }
      else if(option.name === 'lowestPrice'){
        tempData.sort((a, b) => a.orderPrice - b.orderPrice);
      }
      setSortedData(tempData);
    }
  }, [sortOption, dataToShow]);

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
              Ngày Nhận Phòng
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
          <div onClick={() => {HandleChangeStateView('coming')}} className={`item ${(roomStateShow === 'coming') ? 'selected' : ''}`}>Đặt phòng sắp đến</div>
          <div onClick={() => {HandleChangeStateView('passed')}} className={`item ${roomStateShow === 'passed' ? 'selected' : ''}`}>Đặt phòng đã qua</div>
          <div onClick={() => {HandleChangeStateView('canceled')}} className={`item ${roomStateShow === 'canceled' ? 'selected' : ''}`}>Đặt phòng đã hủy</div>
        </div>

        <div className="side-main">
          <div className="sort">
            <div className="sort__title">Sắp xếp theo</div>
            <div className="sort__wrapper">
            <div
              className={`sort__wrapper__item ${sortOption[0].selected ? 'selected' : ''}`}
              onClick={() => {handleSortOptionClick(0)}}
            >
              Gần nhất
            </div>
            <div
              className={`sort__wrapper__item ${sortOption[1].selected ? 'selected' : ''}`}
              onClick={() => {handleSortOptionClick(1)}}
            >
              Cũ nhất
            </div>
            <div
              className={`sort__wrapper__item ${sortOption[2].selected ? 'selected' : ''}`}
              onClick={() => {handleSortOptionClick(2)}}
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
            {sortedData.map((bookingHistory) => {
              if(roomStateShow === 'coming' && bookingHistory.state === 'coming'){
                return (<HorizontalCard DataToShow={bookingHistory} type="history" state="coming" />);
              }
              else if(roomStateShow === 'passed' && bookingHistory.state === 'passed'){
                return (<HorizontalCard DataToShow={bookingHistory} type="history" state="passed" />);
              }
              else if(roomStateShow === 'canceled' && bookingHistory.state === 'canceled'){
                return (<HorizontalCard DataToShow={bookingHistory} type="history" state="canceled" />);
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
