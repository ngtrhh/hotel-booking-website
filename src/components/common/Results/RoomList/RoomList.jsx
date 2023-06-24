import React, {useState, useEffect} from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import RoomListSortItem from "./RoomListSortItem";
import StarItem from "../FilterBar/StarItem";
import CardRoomItem from "./CardRoomItem";

export const RoomList = (data) => {
    const [sortOpitons, setSortOpitons] = useState([
		{ name: 'mostPopular', label: 'Phổ biến nhất', selected: true },
		{ name: 'highest Rating', label: 'Đánh giá cao nhất', selected: false },
		{ name: 'highestPrice', label: 'Giá cao nhất', selected: false },
		{ name: 'lowestPrice', label: 'Giá thấp nhất', selected: false }
	]);

    const HandleSortChange = (optionSelected) => {
        const updatedSortOption = sortOpitons.map(option => {
            if(option.name === optionSelected){
                console.log("wd");  
                return{
                    ...option,
                    selected: !option.selected
                }
                
            }
            return{
                ...option,
                selected: false
            }
        });
        setSortOpitons(updatedSortOption)
    }

    return(
        <div className="results-roomlist">
            <div className="results-roomlist__map">
                <Button iconSize={24} preIcon={BsMap} className="cyan results-roomlist__map__button">Xem vị trí trên bản đồ</Button>
            </div>
            <div className="results-roomlist__header">
                <p>
                    <span>1000+ </span>
                    chỗ nghỉ phù hợp tại 
                    <span> Phú Quốc</span>
                </p>
            </div>
            <div className="results-roomlist__content">
                <div className="results-roomlist__content__sort">
                    <div className="results-roomlist__content__sort__header">
                        Sắp xếp theo
                    </div>
                    <div className="results-roomlist__content__sort__items">
                    {sortOpitons.map(data => (
                        <RoomListSortItem
                            key={data.name}
                            text={data.label}
                            selected={data.selected}
                            onClick = {() => HandleSortChange(data.name)}
                        />
                    ))}
                    </div>
                </div>
                <div className="results-roomlist__content__roomitems">
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    <CardRoomItem/>
                    
                </div>
            </div>
            
        </div>
    );
    
}

export default RoomList;
