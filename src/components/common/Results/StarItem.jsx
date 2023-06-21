import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import {
	BsStarFill
} from "react-icons/bs";
import { Input, Slider } from "antd";
import { useState } from "react";
import classNames from "classnames";

const StarItem = (props) => {
	const itemClasses = classNames("filter-star-container", {
		checked: props.checked,
		unchecked: !props.checked
	});
	
	return (
		<div onClick={props.onClick} className={itemClasses}>
			<div className="filter-star-item">
				<div className="filter-star-item__value">{props.label}</div>
				{props.checked ? (
					<BsStarFill className="filter-star-item__icon" size={16} />
					) : (
					<BsStarFill className="filter-star-item__icon" size={16} />
				)}
			</div>
		</div>
	);
};

export default StarItem;
