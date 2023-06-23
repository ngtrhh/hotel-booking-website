import React from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";

export const RoomListFilterItem = (props) => {
    return(
        <div className="results-roomlist-item">
            {props.text}
        </div>
    );
    
}

export default RoomListFilterItem;
