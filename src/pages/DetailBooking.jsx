import React, { useState } from "react";
import Back from "../components/common/Back";
import image from "../assets/images/ImageBanner.png";
import { BsGeoAlt, BsStarFill } from "react-icons/bs";
import Button from "../components/common/Button";
import { Input } from "../components/common/Account/Input";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export const DetailBooking = (props) => {
  const [bookingTime, setBookingTime] = useState("8:05:34 AM, ngày 01/04/2023");
  const [paymentTime, setPaymentTime] = useState("8:05:34 AM, ngày 01/04/2023");
  const [input, setInput] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana123@gmail.com",
    phoneNumber: "0123456789",
  });
  const [namePayment, setNamePayment] = useState("Nguyễn Văn A");
  const [numberPayment, setNumberPayment] = useState("0123456789");
  const [nameBank, setNameBank] = useState("0123456789");

  return (
    <div className="detail-booking">
      <Back />
      <div className="title">Chi tiết đặt phòng</div>
      <div className="section">
        <div className="title">
          Thông tin đặt phòng
          <span>Đặt đặt phòng lúc {bookingTime}</span>
        </div>
        <div className="content">
          <div id="image-content">
            <div className="image">
              <img src={image} />
              <div className="tag">
                <div className="tag__item">Resort</div>
                <div className="tag__item">
                  4 <BsStarFill size={12} />
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="name-room">Tên phòng</div>
              <div className="name-hotel">Mai PHƯƠNG Resort PhÚ QuỐc</div>
              <div className="address">
                <BsGeoAlt size={24} />
                Bãi Dài, Cửa Cạn, Phú Quốc, Việt Nam
              </div>
              <div className="rating">
                <div className="score">8,4</div>
                <div className="reviews">231 lượt đánh giá</div>
              </div>
              <div className="facilities">
                <div className="facilities__wrapper">
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                  <div className="facilities__wrapper__item">
                    Hồ bơi ngoài trời
                  </div>
                </div>

                <div className="view-detail">
                  <Button className="outline">Xem chi tiết</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="bottom__item">
              <div className="bottom__item__title">Nhận phòng</div>
              <div className="bottom__item__content">8/4/2023</div>
              <div className="bottom__item__description">Từ 14:00</div>
            </div>
            <div className="bottom__item">
              <div className="bottom__item__title">Trả phòng</div>
              <div className="bottom__item__content">9/4/2023</div>
              <div className="bottom__item__description">Cho đến 14:00</div>
            </div>
            <div className="bottom__item">
              <div className="bottom__item__title">Đêm</div>
              <div className="bottom__item__content">1</div>
              <div className="bottom__item__description"></div>
            </div>
            <div className="bottom__item">
              <div className="bottom__item__title">Số khách</div>
              <div className="bottom__item__content">2</div>
              <div className="bottom__item__description"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="two-columns">
        <div className="section" id="left">
          <div className="title">Thông tin người đặt</div>
          <Input label="Họ tên" disable value={input.name} />
          <Input label="Email" disable value={input.email} />
          <Input label="Số điện thoại" disable value={input.numberPhone} />
        </div>
        <div className="section" id="right">
          <div className="title">Giá chi tiết</div>
          <div className="row">
            <span>Tên phòng x 1 đêm </span>
            <div className="row__price-room">
              <div className="row__price-room__old">1.100.0000 đ</div>
              <div className="row__price-room__new">840.000 đ</div>
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
              <div className="total-price__column__price">840.000 đ</div>
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
          <span className="success">Đã thanh toán lúc {paymentTime} </span>
        </div>
        <Input label="Chủ tài khoản" disable value={namePayment} />
        <Input label="Số tài khoản" disable value={numberPayment} />
        <Input label="Ngân hàng" disable value={nameBank} />
      </div>

      <div className="button-wrapper">
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
        <Link to="/edit-booking">
          <Button className="cyan">Thay đổi</Button>
        </Link>
      </div>
    </div>
  );
};
