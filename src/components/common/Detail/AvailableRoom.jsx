import React, { useContext } from "react";
import Button from "../Button";
import { BsImages, BsPersonFill } from "react-icons/bs";
import { MdKingBed, MdZoomOutMap } from "react-icons/md";
import { AppContext } from "../../../Context/AppProvider";
import { useNavigate } from "react-router-dom";

const AvailableRoom = (props) => {
  const dataProvided = useContext(AppContext);
  const {accomData, selectedRoom, setSelectedRoom} = dataProvided;
  const {roomData, image} = props;
  const navigation = useNavigate();
  const BookNow = () => {
    setSelectedRoom({...roomData, image: image});
    window.scrollTo(0, 0);
    navigation('/booking')
  }
  return (
    <div className="available-room">
      <img
        className="image"
        src={image}
      />
      <div className="more-images">
        +5 <BsImages size={20} />
      </div>
      <div className="wrapper">
        <div className="title">{roomData.name}</div>

        <div className="infor-room">
          <div className="infor-room__item">
            <MdKingBed size={20} />{roomData.bed}
          </div>
          <div className="infor-room__item">
            <BsPersonFill size={20} />{roomData.capacity}
          </div>
          <div className="infor-room__item">
            <MdZoomOutMap size={20} />
            {roomData.area}
          </div>
        </div>

        <div className="facilities">
          {(roomData.facility).map((faci) => {
            return (
              <span>{faci}</span>
            )
          })}
          <span>Xem tất cả tiện ích</span>
        </div>

        <div className="offer">
          {(roomData.servive).map((sv) => {
              return (
                <span>{sv}</span>
              )
            })}
        </div>

        <Button className="outline">Xem chi tiết phòng</Button>
        <div className="price-wrapper">
          <div className="price-wrapper__column">
            <div className="price-old">{roomData.originalPrice + " đ"}</div>
            <div className="price-new">{roomData.price}</div>
            <div className="price-detail">Đã bao gồm thuế và phí</div>
          </div>
          <div className="price-wrapper__column">
            <div className="percent-sale">{'Tiết kiệm ' + roomData.saleoff}</div>
            <Button onClick={BookNow} className="cyan glow">Đặt ngay</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableRoom;
