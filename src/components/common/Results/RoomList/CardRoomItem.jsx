import React from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import classNames from "classnames";
import { 
    BsStarFill, BsHeart, BsGeoAlt, BsPeopleFill, BsHeartFill
} from "react-icons/bs";
import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export const CardRoomItem = (props) => {
    const dataProvided = useContext(AppContext);
    const {user} = dataProvided;
    const roomData = props.roomData;
    const loved = (user) ? (((user.lovedRoomsId).includes(roomData.accomId)) ? true : false) : false;
    const ClassName = classNames('');

    const HandleChangeLovedState = () => {
        const lovedRoomsRef = doc(db, "users", user.uid);
        if(loved){
            updateDoc(lovedRoomsRef, {
                lovedRoomsId: arrayRemove(roomData.accomId)
            });
        }
        else{
            updateDoc(lovedRoomsRef, {
                lovedRoomsId: arrayUnion(roomData.accomId)
            });
            
        }
    }
    return(
        <div className="results-card-roomitem">
            <div className="results-card-roomitem__room-img" style={{ 
                backgroundImage: `url("${roomData.images[0]}")` 
            }}>
                <div className="results-card-roomitem__room-img__header">
                    <div className="results-card-roomitem__room-img__header__left">
                        <div className="results-card-roomitem__room-img__header__accommodation-type">
                            {roomData.type}
                        </div>
                        <div className="results-card-roomitem__room-img__header__num-of-star">
                            <div className="results-card-roomitem__room-img__header__num-of-star__value">
                                {roomData.star}
                            </div>
                            <div className="results-card-roomitem__room-img__header__num-of-star__icon-container">
                                <BsStarFill size={12} className="results-card-roomitem__room-img__header__num-of-star__star"/>
                            </div>
                        </div>
                    </div>
                    <div onClick={HandleChangeLovedState} className="results-card-roomitem__room-img__header__right">
                        {
                            (loved) ? (
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
                                {roomData.name}
                            </div>
                            <div className="results-card-roomitem__detail__info__basic-info__name-address__accom-address">
                                <BsGeoAlt size={20} style={{minWidth:'20px'}}/>
                                <p>{roomData.address}</p>
                                
                            </div>
                        </div>
                        <div className="results-card-roomitem__detail__info__basic-info__review">
                            <div className="results-card-roomitem__detail__info__basic-info__review__rating">
                                {roomData.rating}
                            </div>
                            <div className="results-card-roomitem__detail__info__basic-info__review__rating-count">
                                {roomData.ratingCount + " đánh giá"}
                            </div>
                        </div>
                    </div>

                    <div className="results-card-roomitem__detail__info__facility">
                        <div className="results-card-roomitem__detail__info__facility__signature">
                            {roomData.facilities && roomData.facilities.length > 0 ? roomData.facilities[0] : ''}
                            <BsPeopleFill size={16}/>
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__second">
                            {roomData.facilities && roomData.facilities.length > 0 ? roomData.facilities[1] : ''}
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__last">
                            {roomData.facilities && roomData.facilities.length > 0 ? roomData.facilities[2] : ''}
                        </div>
                        <div className="results-card-roomitem__detail__info__facility__others">
                            <div className="results-card-roomitem__detail__info__facility__others__item">
                                {roomData.facilities && roomData.facilities.length > 0 ? roomData.facilities[3] : ''}
                            </div>
                            <div className="results-card-roomitem__detail__info__facility__others__item">
                                {roomData.facilities && roomData.facilities.length > 0 ? roomData.facilities[4] : ''}
                            </div>
                            <div className="results-card-roomitem__detail__info__facility__others__item more">
                                {roomData.facilities && roomData.facilities.length > 5 ? (roomData.facilities.length - 6).toString() + '+' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="results-card-roomitem__detail__price">
                    <div className="results-card-roomitem__detail__price__original-price">
                        {roomData.originalPrice + 'đ'}
                    </div>
                    <div className="results-card-roomitem__detail__price__sale-price">
                        <div className="results-card-roomitem__detail__price__sale-price__value">
                            {roomData.price + 'đ'}
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
