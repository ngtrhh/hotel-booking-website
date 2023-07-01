import React from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import classNames from "classnames";
import { 
    BsStarFill, BsHeart, BsGeoAlt, BsPeopleFill, BsHeartFill
} from "react-icons/bs";

export const CardRoomItem = (props) => {
    const roomData = props.roomData;
    const ClassName = classNames('');
    return(
        <div className="results-card-roomitem">
            <div className="results-card-roomitem__room-img" style={{ 
                backgroundImage: `url("${roomData.roomImg}")` 
            }}>
                <div className="results-card-roomitem__room-img__header">
                    <div className="results-card-roomitem__room-img__header__left">
                        <div className="results-card-roomitem__room-img__header__accommodation-type">
                            {roomData.accommodationType}
                        </div>
                        <div className="results-card-roomitem__room-img__header__num-of-star">
                            <div className="results-card-roomitem__room-img__header__num-of-star__value">
                                {roomData.numOfStars}
                            </div>
                            <div className="results-card-roomitem__room-img__header__num-of-star__icon-container">
                                        <BsStarFill size={12} className="results-card-roomitem__room-img__header__num-of-star__star"/>
                            </div>
                        </div>
                    </div>
                    <div className="results-card-roomitem__room-img__header__right">
                        {
                            roomData.loved ? (
                                <div className='results-card-roomitem__room-img__header__right__love loved'>
                                    <BsHeartFill  size={28}/>
                                </div>
                            ) : (
                                <div className='results-card-roomitem__room-img__header__right__love'>
                                    <BsHeart  size={28}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="results-card-roomitem__detail">
                <div className="results-card-roomitem__detail__info">
                    <div className="results-card-roomitem__detail__info__basic-info">
                        <div className="results-card-roomitem__detail__info__basic-info__name-address">
                            <div className="results-card-roomitem__detail__info__basic-info__name-address__accom-name">
                                {roomData.accomName}
                            </div>
                            <div className="results-card-roomitem__detail__info__basic-info__name-address__accom-address">
                                <BsGeoAlt size={20}/>
                                <p>{roomData.accomAddress}</p>
                                
                            </div>
                        </div>
                        <div className="results-card-roomitem__detail__info__basic-info__review">
                            <div className="results-card-roomitem__detail__info__basic-info__review__rating">
                                {roomData.rating}
                            </div>
                            <div className="results-card-roomitem__detail__info__basic-info__review__rating-count">
                                {roomData.ratingCount}
                            </div>
                        </div>
                    </div>

                    <div className="results-card-roomitem__detail__info__facility">
                        <div className="results-card-roomitem__detail__info__facility__signature">
                            {roomData.facility && roomData.facility.length > 0 ? roomData.facility[0] : ''}
                            <BsPeopleFill size={16}/>
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__second">
                            {roomData.facility && roomData.facility.length > 0 ? roomData.facility[1] : ''}
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__last">
                            {roomData.facility && roomData.facility.length > 0 ? roomData.facility[2] : ''}
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__others">
                            <div className="results-card-roomitem__detail__info__facility__others__item">
                                {roomData.facility && roomData.facility.length > 0 ? roomData.facility[3] : ''}
                            </div>
                            <div className="results-card-roomitem__detail__info__facility__others__item">
                                {roomData.facility && roomData.facility.length > 0 ? roomData.facility[4] : ''}
                            </div>
                            <div className="results-card-roomitem__detail__info__facility__others__item more">
                                {roomData.facility && roomData.facility.length > 5 ? (roomData.facility.length - 6).toString() + '+' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="results-card-roomitem__detail__price">
                    <div className="results-card-roomitem__detail__price__original-price">
                        {roomData.originalPrice.toString() + 'đ'}
                    </div>
                    <div className="results-card-roomitem__detail__price__sale-price">
                        <div className="results-card-roomitem__detail__price__sale-price__value">
                            {roomData.salePrice.toString() + 'đ'}
                        </div>
                        <div className="results-card-roomitem__detail__price__sale-price__per-unit">
                            {roomData.perUnit}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default CardRoomItem;
