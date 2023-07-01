import React from "react";
import Button from "../Button";
import { BsImages, BsPersonFill } from "react-icons/bs";
import { MdKingBed, MdZoomOutMap } from "react-icons/md";

const AvailableRoom = () => {
  return (
    <div className="available-room">
      <img
        className="image"
        src={require("../../../assets/images/ImageBanner.png")}
      />
      <div className="more-images">
        +5 <BsImages size={20} />
      </div>
      <div className="wrapper">
        <div className="title">Tên phòng</div>

        <div className="infor-room">
          <div className="infor-room__item">
            <MdKingBed size={20} />1 giường đôi lớn
          </div>
          <div className="infor-room__item">
            <BsPersonFill size={20} />2 người
          </div>
          <div className="infor-room__item">
            <MdZoomOutMap size={20} />
            28m2
          </div>
        </div>

        <div className="facilities">
          <span>Ban công</span>
          <span>Nhìn ra vườn</span>
          <span>Điều hòa không khí</span>
          <span>Xem tất cả tiện ích</span>
        </div>

        <div className="offer">
          <span>Miễn phí hủy phòng</span>
          <span>Bao bữa sáng</span>
        </div>

        <Button className="outline">Xem chi tiết phòng</Button>
        <div className="price-wrapper">
          <div className="price-wrapper__column">
            <div className="price-old">1.110.000 đ</div>
            <div className="price-new">844.000 đ</div>
            <div className="price-detail">Đã bao gồm thuế và phí</div>
          </div>
          <div className="price-wrapper__column">
            <div className="percent-sale">Tiết kiệm 60%</div>
            <Button className="cyan glow">Đặt ngay</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableRoom;
