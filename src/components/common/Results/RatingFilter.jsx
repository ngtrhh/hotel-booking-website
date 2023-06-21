import React from "react";
import Logo from "../Logo";
import Button from "../Button";
import {
  
} from "react-icons/bs";
import { Input, Slider } from "antd";
import { useState, useEffect } from "react";
import RatingItem from "./RatingItem";


const RatingFilter = () => {
	const [ratingFilterChoices, setRatingFilterChoices] = useState([
		{ name: 'rating3', label: '3+', checked: false },
		{ name: 'rating3_5', label: '3.5+', checked: false },
		{ name: 'rating4', label: '4', checked: false },
		{ name: 'rating4_5', label: '4.5+', checked: false },
		{ name: 'rating5', label: '5+', checked: false }
	]);
	const handleFilterChange = (name) => {
		const updatedFilterChoices = ratingFilterChoices.map((filter) => {
		  	if (filter.name === name) {
				return {
				...filter,
				checked: !filter.checked
				};
			}
		  	return filter;
		});
		setRatingFilterChoices(updatedFilterChoices);
	};

	const HandleUncheckedAll = () => {
		const updatedFilterChoices = ratingFilterChoices.map((filter) => ({
			...filter,
			checked: false
		}));
		setRatingFilterChoices(updatedFilterChoices);
	};

	useEffect(() => {
		console.log(ratingFilterChoices);
	}, [ratingFilterChoices]);

  	return (
    	<div className="results__filter__ratingfilter">
			<div className="results__filter__ratingfilter__header">
				<div className="results__filter__ratingfilter__header__text">
					Xếp hạng đánh giá
				</div>
				<div onClick={HandleUncheckedAll} className="filter-remove-choice-btn">
					Xóa
				</div>
			</div>
			<div className="results__filter__ratingfilter__items-container">
				{ratingFilterChoices.map(data => (
					<RatingItem
						key={data.name}
						label={data.label}
						checked={data.checked}
						onClick={() => {handleFilterChange(data.name)}}
					/>
				))}
			</div>
		</div>
  );
};

export default RatingFilter;
