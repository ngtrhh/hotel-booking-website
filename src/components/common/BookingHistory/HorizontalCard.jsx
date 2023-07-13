import React from "react";
import Button from "../Button";
import { BsStarFill, BsHeart, BsGeoAltFill } from "react-icons/bs";
import image from "../../../assets/images/ImageBanner.png";
import { format, addDays, differenceInDays, formatDistance, differenceInMilliseconds } from "date-fns";

const state = ["passed", "coming", "canceled"];

export const HorizontalCard = (props) => {
  const data = props.DataToShow;
  // let state = parseFloat(formatDistance(
  //   data.recvDate,
  //   data.endDate
  // ).split(' ')[0]);
  return (
    <div className="horizontal-card">
      <div className="image">
        <img src={data.images[0]} />
        <div className="tag">
          <div className="tag__item">{data.type}</div>
          <div className="tag__item">
            {data.star}
            <BsStarFill size={12} />
          </div>
        </div>
        {props.type === "history" && props.state === state[0] && (
          <div className="date">{'Đã đặt ngày ' + data.orderDate.toDate().toLocaleDateString()}</div>
        )}
        {props.type === "history" && props.state === state[1] && (
          <div className="remind">Còn 2 ngày nữa nhận phòng!</div>
        )}
        {props.type === "history" && props.state === state[2] && (
          <div className="date canceled">Đã hủy ngày 09/02/2023</div>
        )}
      </div>
      <div className="description">
        <div className="wrapper">
          <div className="name">
            {data.accomsName || data.name}
            <BsHeart size={40} />
          </div>
          <div className="address">
            <BsGeoAltFill size={18} />
            <span>{data.address}</span>
          </div>
          <div className="rating">
            <div className="rating__score">{data.rating}</div>
            <div className="rating__reviews">{data.ratingCount + ' lượt đánh giá'}</div>
          </div>
          {props.type === "favourite" && (
            <>
              <div className="flex-end old-price">2.110.000 đ</div>
              <div className="flex-end">
                <div className="new-price">
                  Từ: <span>844.000 đ</span>
                </div>
                <div className="sub">/đêm</div>
              </div>
            </>
          )}
        </div>
        {props.type === "history" && (
          <div className="wrapper">
            <div className="wrapper__row">
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">
                  Ngày nhận phòng:
                </div>
                <span>{data.recvDate.toDate().toLocaleDateString()}</span>
              </div>
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">Ngày trả phòng:</div>
                <span>{data.endDate.toDate().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="wrapper__row">
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">Số đêm:</div>
                <span>{data.nights}</span>
              </div>
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">Số người:</div>
                <span>{
            data.children > 0
              ? `${data.guest} người - ${data.children} trẻ em - ${data.numOfRooms} phòng`
              : `${data.guest} người - ${data.numOfRooms} phòng`
          }</span>
              </div>
            </div>
            <div className="wrapper__room">
              <div className="wrapper__room__name">
                {data.roomTypeName}
              </div>
              <span>{data.oneRoomPrice}</span>
            </div>
            <div className="wrapper__total">
              Tổng cộng: <span>{data.orderPrice.toLocaleString('vi-VN') + ' đ'}</span>
            </div>
          </div>
        )}

        <div className="button-wrapper">
          <Button className="outline">Xem chi tiết</Button>
        </div>
      </div>
    </div>
  );
};
