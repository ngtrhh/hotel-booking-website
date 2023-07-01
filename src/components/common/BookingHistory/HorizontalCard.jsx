import React from "react";
import Button from "../Button";
import { BsStarFill, BsHeart, BsGeoAltFill } from "react-icons/bs";
import image from "../../../assets/images/ImageBanner.png";

const state = ["passed", "coming", "canceled"];

export const HorizontalCard = (props) => {
  return (
    <div className="horizontal-card">
      <div className="image">
        <img src={image} />
        <div className="tag">
          <div className="tag__item">Khách sạn</div>
          <div className="tag__item">
            4 <BsStarFill size={12} />
          </div>
        </div>
        {props.state === state[2] ? (
          <div className="date canceled">Đã hủy ngày 09/02/2023</div>
        ) : (
          <div className="date">Đã đặt ngày 09/02/2023</div>
        )}
        {props.state === state[1] && (
          <div className="remind">Còn 2 ngày nữa nhận phòng!</div>
        )}
      </div>
      <div className="description">
        <div className="wrapper">
          <div className="name">
            Mai Phương Resort Phú Quốc
            <BsHeart size={40} />
          </div>
          <div className="address">
            <BsGeoAltFill size={18} />
            <span>Địa chỉ Phường, TP</span>
          </div>
          <div className="rating">
            <div className="rating__score">8,4</div>
            <div className="rating__reviews">231 lượt đánh giá</div>
          </div>
        </div>
        <div className="wrapper">
          <div className="wrapper__row">
            <div className="wrapper__row__item">
              <div className="wrapper__row__item__title">Ngày nhận phòng:</div>
              <span>12/02/2023</span>
            </div>
            <div className="wrapper__row__item">
              <div className="wrapper__row__item__title">Ngày trả phòng:</div>
              <span>14/02/2023</span>
            </div>
          </div>
          <div className="wrapper__row">
            <div className="wrapper__row__item">
              <div className="wrapper__row__item__title">Số đêm:</div>
              <span>2</span>
            </div>
            <div className="wrapper__row__item">
              <div className="wrapper__row__item__title">Số người:</div>
              <span>2</span>
            </div>
          </div>
          <div className="wrapper__room">
            <div className="wrapper__room__name">
              Phòng 2 giường đơn nhìn ra vườn
            </div>
            <span> 936.000 đ</span>
          </div>
          <div className="wrapper__total">
            Tổng cộng: <span>1.872.000đ</span>
          </div>
        </div>
        <div className="button-wrapper">
          <Button className="outline">Xem chi tiết</Button>
        </div>
      </div>
    </div>
  );
};
