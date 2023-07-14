import React, { useContext, useEffect, useRef, useState } from "react";
import Back from "../components/common/Back";
import image from "../assets/images/ImageBanner.png";
import { BsGeoAlt, BsStarFill } from "react-icons/bs";
import Button from "../components/common/Button";
import { Input } from "../components/common/Account/Input";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AppContext } from "../Context/AppProvider";
import { format } from 'date-fns';
import { useNavigate } from "react-router";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { message } from "antd";

export const DetailBooking = (props) => {
  const dataProvided = useContext(AppContext);
  const {bookingHistoryData, setBookingHistoryData, roomTypes} = dataProvided; 
  const [bookingTime, setBookingTime] = useState("8:05:34 AM, ngày 01/04/2023");
  const [paymentTime, setPaymentTime] = useState("8:05:34 AM, ngày 01/04/2023");
  const [input, setInput] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [namePayment, setNamePayment] = useState("Nguyễn Trung");
  const [numberPayment, setNumberPayment] = useState("0123456789");
  const [nameBank, setNameBank] = useState("Vietcombank");
  const [isCanEdit, setIsCanEdit] = useState(false);
  const [editFocusInput, setEditFocusInput] = useState(false);
  const [facilitiesToShow, setFacilitiesToShow] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const customerInfoRef = useRef(null);
  const ScrollToCustomerInfo = () => {
    customerInfoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });    
  }
  const HandleEditAndUpdate = () => {
    if(!isCanEdit){
      setIsCanEdit(true); 
      ScrollToCustomerInfo();
      setEditFocusInput(true);
    }
    else{
      if(CheckInputValid()){
        const updateCustomerInfoRef = doc(db, "orders", bookingHistoryData.orderId);
        updateDoc(updateCustomerInfoRef, {
          customerName: bookingHistoryData.customerName,
          customerMail: bookingHistoryData.customerMail,
          customerPhone: bookingHistoryData.customerPhone,
        });
        message.success("Cập nhật thông tin thành công!");
      }
      else{

      }
    }
  };
  const handleCustomerNameChange = (event) => {
    setBookingHistoryData({
      ...bookingHistoryData,
      customerName: event.target.value
    });
  };
  const handleCustomerMailChange = (event) => {
    setBookingHistoryData({
      ...bookingHistoryData,
      customerMail: event.target.value
    });
  };
  const handleCustomerPhoneChange = (event) => {
    setBookingHistoryData({
      ...bookingHistoryData,
      customerPhone: event.target.value
    });
  };
  const CheckInputValid = () => {
    if(bookingHistoryData.customerName === '' || bookingHistoryData.customerMail === '' || bookingHistoryData.customerPhone === ''){
      message.warning("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    return true;
  }

  // const validateInput = (e) => {
  //   let { name, value } = e.target;
  //   setError((prev) => {
  //     const stateObj = { ...prev, [name]: "" };

  //     switch (name) {
  //       case "name":
  //         if (!value) {
  //           stateObj[name] = "Vui lòng nhập họ tên!";
  //         }
  //         break;

  //       case "email":
  //         if (!value) {
  //           stateObj[name] = "Vui lòng nhập email!";
  //         } else {
  //           const gmailRegex = /^[^\s@]+@gmail\.com$/;

  //           if (!gmailRegex.test(value)) stateObj[name] = "Email không hợp lệ!";
  //         }
  //         break;

  //       case "phoneNumber":
  //         if (!value) {
  //           stateObj[name] = "Vui lòng nhập số điện thoại!";
  //         }
  //         break;

  //       default:
  //         break;
  //     }

  //     return stateObj;
  //   });
  // };

  const handleSubmit = () => {
    
  };
  

  return (
    <div className="detail-booking">
      <Back />
      <div className="title">Chi tiết đặt phòng</div>
      <div className="section">
        <div className="title">
          Thông tin đặt phòng
          <span>
            {'Đặt đặt phòng lúc ' +
              (bookingHistoryData?.orderDate
                ? format(bookingHistoryData.orderDate.toDate(), "hh:mm:ss a, 'ngày' dd/MM/yyyy")
                : '...')}
          </span>
        </div>
        <div className="content">
          <div id="image-content">
            <div className="image">
              <img src={bookingHistoryData?.images[0]} />
              <div className="tag">
                <div className="tag__item">{bookingHistoryData?.type || 'Loading...'}</div>
                <div className="tag__item">
                  {bookingHistoryData?.star || '...'} <BsStarFill size={12} />
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="name-room">{bookingHistoryData?.roomTypeName}</div>
              <div className="name-hotel">{bookingHistoryData?.name}</div>
              <div className="address">
                <BsGeoAlt size={24} />
                {bookingHistoryData?.address}
              </div>
              <div className="rating">
                <div className="score">{bookingHistoryData?.rating}</div>
                <div className="reviews">{bookingHistoryData?.ratingCount + ' lượt đánh giá'}</div>
              </div>
              <div className="facilities">
                <div className="facilities__wrapper">
                  {
                    bookingHistoryData?.facilities.map((item) => {
                      return(
                        <div className="facilities__wrapper__item">
                          {item}
                        </div>
                      );
                    })
                  }
                </div>

                <div className="view-detail">
                  <Button onClick={() => {navigate('/detail/' + bookingHistoryData.accomId)}} className="outline">Xem chi tiết</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="bottom__item">
              <div className="bottom__item__title">Nhận phòng</div>
              <div className="bottom__item__content">{bookingHistoryData?.recvDate ? bookingHistoryData.recvDate?.toDate().toLocaleDateString('vi-VN') : ''}</div>
              <div className="bottom__item__description">{'Từ ' + (bookingHistoryData?.recvDate
                ? format(bookingHistoryData.recvDate.toDate(), "hh:mm")
                : '...')}
              </div>
            </div>
            <div className="bottom__item">
              <div className="bottom__item__title">Trả phòng</div>
              <div className="bottom__item__content">{bookingHistoryData?.endDate ? bookingHistoryData.endDate?.toDate().toLocaleDateString('vi-VN') : ''}</div>
              <div className="bottom__item__description">{'Cho đến ' + (bookingHistoryData?.recvDate
                ? format(bookingHistoryData.endDate.toDate(), "hh:mm")
                : '...')}</div>
            </div>
            <div className="bottom__item">
              <div className="bottom__item__title">Đêm</div>
              <div className="bottom__item__content">{bookingHistoryData?.nights || '0'}</div>
              <div className="bottom__item__description"></div>
            </div>
            <div className="bottom__item">
              <div className="bottom__item__title">Số khách</div>
              <div className="bottom__item__content">{
            bookingHistoryData?.children > 0
              ? `${bookingHistoryData?.guest} người - ${bookingHistoryData?.children} trẻ em - ${bookingHistoryData?.numOfRooms} phòng`
              : `${bookingHistoryData?.guest} người - ${bookingHistoryData?.numOfRooms} phòng`
          }</div>
              <div className="bottom__item__description"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="two-columns">
        <div className="section" id="left">
          <div ref={customerInfoRef} className="title">Thông tin người đặt</div>
          <Input 
            error={error.name} 
            onChange={handleCustomerNameChange} 
            focus={editFocusInput} 
            label="Họ tên" disable={!isCanEdit} value={bookingHistoryData.customerName} />
          <Input 
            error={error.email}
            onChange={handleCustomerMailChange} label="Email" disable={!isCanEdit} value={bookingHistoryData.customerMail} />
          <Input
            error={error.phoneNumber}
            onChange={handleCustomerPhoneChange} label="Số điện thoại" disable={!isCanEdit} value={bookingHistoryData.customerPhone} />
        </div>
        <div className="section" id="right">
          <div className="title">Giá chi tiết</div>
          <div className="row">
            <span>Tên phòng x 1 đêm </span>
            <div className="row__price-room">
              <div className="row__price-room__old">{bookingHistoryData?.orderOriginalPrice + ' đ' || "..."}</div>
              <div className="row__price-room__new">{bookingHistoryData?.oneRoomPrice.toLocaleString('vi-VN') || "..."}</div>
            </div>
          </div>
          <div className="row">
            <span>Thuế và phí dịch vụ khách sạn</span>
            <span>99.000 đ</span>
          </div>
          <div className="row">
            <span>Ưu đãi</span>
            <span>-99.000 đ</span>
          </div>
          <div className="total-price">
            <div className="total-price__title">Tổng cộng</div>
            <div className="total-price__column">
              <div className="total-price__column__price">{bookingHistoryData?.orderPrice.toLocaleString('vi-VN') + ' đ' || "..."}</div>
              <div className="total-price__column__sub">
                Đã bao gồm thuế và phí
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="title">
          Thông tin thanh toán
          <span className="success">{'Đặt thanh toán lúc ' +
              (bookingHistoryData?.orderDate
                ? format(bookingHistoryData.orderDate.toDate(), "hh:mm:ss a, 'ngày' dd/MM/yyyy")
                : '...')}</span>
        </div>
        <Input label="Chủ tài khoản" disable value={namePayment} />
        <Input label="Số tài khoản" disable value={numberPayment} />
        <Input label="Ngân hàng" disable value={nameBank} />
      </div>

      <div className="button-wrapper">
        {!isCanEdit &&
          <Popup
          trigger={<Button className="red">Hủy đặt phòng</Button>}
          modal
          nested
          >
          {(close) => (
            <div className="modal">
              <div className="title">Bạn có chắc chắn muốn hủy phòng?</div>
              <div className="button-wrapper">
                <Button
                  className="red"
                  onClick={() => {
                    close();
                  }}
                >
                  Có, tôi chắc chắc muốn hủy phòng
                </Button>
                <Button className="red outline" onClick={() => close()}>
                  Hủy bỏ
                </Button>
              </div>
            </div>
          )}
        </Popup>
        }
        
        <Button onClick={() => {HandleEditAndUpdate();}} className="cyan">{isCanEdit ? 'Cập nhật' : 'Thay đổi'}</Button>
      </div>
    </div>
  );
};
