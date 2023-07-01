import React from "react";
import Logo from "../../Logo";
import Button from "../../Button";
import {
	BsStarFill
} from "react-icons/bs";
import { Input, Slider } from "antd";
import { useState } from "react";
import classNames from "classnames";

const RatingItem = (props) => {
	const itemClasses = classNames("filter-rating-container", {
		checked: props.checked,
		unchecked: !props.checked
	});
	
	return (
		<div onClick={props.onClick} className={itemClasses}>
			<div className="filter-rating-item">
				<div className="filter-rating-item__value">{props.label}</div>
			</div>
		</div>
	);
};

export default RatingItem;
