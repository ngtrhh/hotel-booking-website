import React from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import classNames from "classnames";
import { 
    BsStarFill, BsHeart, BsGeoAlt, BsPeopleFill, BsHeartFill
} from "react-icons/bs";

export const CardRoomItem = (props) => {
    const ClassName = classNames('');

    return(
        <div className="results-card-roomitem">
            <div className="results-card-roomitem__room-img">
                <div className="results-card-roomitem__room-img__header">
                    <div className="results-card-roomitem__room-img__header__left">
                        <div className="results-card-roomitem__room-img__header__accommodation-type">
                            {/* {props.accommodationType} */}
                            Resort
                        </div>
                        <div className="results-card-roomitem__room-img__header__num-of-star">
                            <div className="results-card-roomitem__room-img__header__num-of-star__value">
                                4
                            </div>
                            <div className="results-card-roomitem__room-img__header__num-of-star__icon-container">
                                <BsStarFill size={12} className="results-card-roomitem__room-img__header__num-of-star__star"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="results-card-roomitem__room-img__header__right">
                        <div className="results-card-roomitem__room-img__header__right__love">
                            <BsHeart  size={28}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="results-card-roomitem__detail">
                <div className="results-card-roomitem__detail__info">
                    <div className="results-card-roomitem__detail__info__basic-info">
                        <div className="results-card-roomitem__detail__info__basic-info__name-address">
                            <div className="results-card-roomitem__detail__info__basic-info__name-address__accom-name">
                                Tên chỗ nghỉ
                            </div>
                            <div className="results-card-roomitem__detail__info__basic-info__name-address__accom-address">
                                <BsGeoAlt size={20}/>
                                <p>Võ Thị Sáu, TP. Vũng Tàu</p>
                                
                            </div>
                        </div>
                        <div className="results-card-roomitem__detail__info__basic-info__review">
                            <div className="results-card-roomitem__detail__info__basic-info__review__rating">
                                8,4
                            </div>
                            <div className="results-card-roomitem__detail__info__basic-info__review__rating-count">
                                200 đánh giá
                            </div>
                        </div>
                    </div>

                    <div className="results-card-roomitem__detail__info__facility">
                        <div className="results-card-roomitem__detail__info__facility__hotest">
                            Bungalow nhìn ra vườn
                            <BsPeopleFill size={16}/>
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__second">
                            Miễn phí hủy phòng
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__last">
                            Bao bữa sáng
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__others">
                            <div className="results-card-roomitem__detail__info__facility__others__item">
                                Wifi
                            </div>
                            <div className="results-card-roomitem__detail__info__facility__others__item">
                                Hồ bơi ngoài trời
                            </div>
                            <div className="results-card-roomitem__detail__info__facility__others__item more">
                                +8
                            </div>
                        </div>
                    </div>
                </div>

                <div className="results-card-roomitem__detail__price">
                    <div className="results-card-roomitem__detail__price__original-price">
                        1.110.000 đ
                    </div>
                    <div className="results-card-roomitem__detail__price__sale-price">
                        <div className="results-card-roomitem__detail__price__sale-price__value">
                            990.000 đ
                        </div>
                        <div className="results-card-roomitem__detail__price__sale-price__per-unit">
                            /đêm
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default CardRoomItem;
