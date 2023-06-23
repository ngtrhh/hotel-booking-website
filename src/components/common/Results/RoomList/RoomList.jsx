import React from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";

export const RoomList = (data) => {
    return(
        <div className="results-roomlist">
            <div className="results-roomlist__map">
                <Button iconSize={24} preIcon={BsMap} className="cyan results-roomlist__map__button">Xem vị trí trên bản đồ</Button>
            </div>
            <div className="results-roomlist__map__header">
                <p>
                    <span>1000+ </span>
                    chỗ nghỉ phù hợp tại 
                    <span> Phú Quốc</span>
                </p>
            </div>
            <div className="results-roomlist-filter">
                <div className="results-roomlist-filter__header">
                    Sắp xếp theo
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
    
}

export default RoomList;
