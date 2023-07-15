import React from "react";
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
