import React, { useContext, useState } from "react";
import Button from "../Button";
import { BsStarFill, BsHeart, BsGeoAltFill, BsHeartFill } from "react-icons/bs";
import image from "../../../assets/images/ImageBanner.png";
import {
  format,
  addDays,
  differenceInDays,
  formatDistance,
  differenceInMilliseconds,
} from "date-fns";
import { AppContext } from "../../../Context/AppProvider";
import { useNavigate } from "react-router";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase/config";
const state = ["passed", "coming", "canceled"];

export const HorizontalCard = (props) => {
  const dataProvided = useContext(AppContext);
  const { bookingHistoryData, setBookingHistoryData, user,  } = dataProvided;
  const navigate = useNavigate();
  const data = props.DataToShow;
  console.log(data);
  // let state = parseFloat(formatDistance(
  //   data.recvDate,
  //   data.endDate
  // ).split(' ')[0]);

  //Nhập bookingHistoryData, setBookingHistoryData từ AppContent

  const HandleViewDetail = () => {
    if (props.type === "favourite") {
      navigate("/detail/" + data.accomId);
    } else {
      setBookingHistoryData(data);
      navigate("/booking-history/detail");
    }
  };
  const HandleChangeLovedState = () => {
    if (user) {
      const lovedRoomsRef = doc(db, "users", user.uid);
      updateDoc(lovedRoomsRef, {
        lovedRoomsId: arrayRemove(data.accomId),
      });
    }
  };

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
          <div className="date">
            {"Đã đặt ngày: " +
              data.orderDate.toDate().toLocaleDateString("vi-VN")}
          </div>
        )}
        {props.type === "history" && props.state === state[1] && (
          <div className="remind">
            {"Còn " +
              Math.ceil((data.recvDate.toDate() - Date.now()) / 86400000) +
              " ngày nữa nhận phòng!"}
          </div>
        )}
        {props.type === "history" && props.state === state[2] && (
          <div className="date canceled">Đã hủy ngày 09/02/2023</div>
        )}
      </div>
      <div className="description">
        <div className="wrapper">
          <div className="name">
            {data.accomsName || data.name}
            {props.type === "favourite" ? (
              <BsHeartFill size={40} onClick={HandleChangeLovedState}/>
            ) : (
              <BsHeart size={40} />
            )}
          </div>
          <div className="address">
            <BsGeoAltFill size={18} />
            <span>{data.address}</span>
          </div>
          <div className="rating">
            <div className="rating__score">{data.rating}</div>
            <div className="rating__reviews">
              {data.ratingCount + " lượt đánh giá"}
            </div>
          </div>
          {props.type === "favourite" && (
            <>
              <div className="flex-end old-price">
                {data.originalPrice + " đ"}
              </div>
              <div className="flex-end">
                <div className="new-price">
                  Từ: <span>{data.price + " đ"}</span>
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
                <span>
                  {data.recvDate.toDate().toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">Ngày trả phòng:</div>
                <span>{data.endDate.toDate().toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
            <div className="wrapper__row">
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">Số đêm:</div>
                <span>{data.nights}</span>
              </div>
              <div className="wrapper__row__item">
                <div className="wrapper__row__item__title">Số người:</div>
                <span>
                  {data.children > 0
                    ? `${data.guest} người - ${data.children} trẻ em - ${data.numOfRooms} phòng`
                    : `${data.guest} người - ${data.numOfRooms} phòng`}
                </span>
              </div>
            </div>
            <div className="wrapper__room">
              <div className="wrapper__room__name">{data.roomTypeName}</div>
              <span>{data.oneRoomPrice}</span>
            </div>
            <div className="wrapper__total">
              Tổng cộng:{" "}
              <span>{data.orderPrice.toLocaleString("vi-VN") + " đ"}</span>
            </div>
          </div>
        )}

        <div className="button-wrapper">
          <Button onClick={HandleViewDetail} className="outline">
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};
