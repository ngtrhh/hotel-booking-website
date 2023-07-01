import React from "react";
import { BsGeoAlt } from "react-icons/bs";

const RecommendedStay = (props) => {
  return (
    <div className="recommended-stay">
      <img
        className="recommended-stay__image"
        src={require("../../../assets/images/ImageBanner.png")}
      />
      <div className="recommended-stay__content">
        <div className="recommended-stay__content__name">{props.name}</div>
        <div className="recommended-stay__content__address">
          <BsGeoAlt size={20} />
          {props.adrress}
        </div>
        <div className="recommended-stay__content__rating">
          <div className="recommended-stay__content__rating__number">
            {props.rating}
          </div>
          {props.reviews}
        </div>
        <div className="recommended-stay__content__price">
          {props.price}
          <span>/đêm</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedStay;
