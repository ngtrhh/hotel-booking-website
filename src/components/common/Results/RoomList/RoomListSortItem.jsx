import React from "react";
import Button from "../../Button"
import { BsMap } from "react-icons/bs";
import classNames from "classnames";

export const RoomListSortItem = (props) => {
    const ClassName = classNames('results-roomlist-sort-item', {selected : props.selected});

    return(
        <div onClick={props.onClick} className={ClassName}>
            {props.text}
        </div>
    );
    
}

export default RoomListSortItem;
