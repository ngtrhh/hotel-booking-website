import React from "react";
import { BsGeoAlt } from "react-icons/bs";

const DestinationItem = (props) => {
  return (
    <div className="destination">
      <img
        className="destination__image"
        src={props.imageURL || require("../../../assets/images/ImageBanner.png")}
      ></img>
      <div className="destination__title">{props.title}</div>
      <div className="destination__number">
        <BsGeoAlt size={20} />
        <div className="destination__number__text">{props.number || 900} chỗ nghỉ</div>
      </div>
    </div>
  );
};

export default DestinationItem;
