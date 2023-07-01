import React from "react";
import Logo from "../../Logo";
import Button from "../../Button";
import {
  
} from "react-icons/bs";
import { Input, Slider } from "antd";
import { useState, useEffect } from "react";
import RatingItem from "./RatingItem";
import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";


const RatingFilter = () => {
	const dataProvided = useContext(AppContext);
	const [ratingFilterChoices, setRatingFilterChoices] = [dataProvided.ratingFilterChoices, dataProvided.setRatingFilterChoices];

	const handleFilterChange = (name) => {
		const updatedFilterChoices = ratingFilterChoices.map((filter) => {
		  	if (filter.name === name) {
				return {
				...filter,
				checked: !filter.checked
				};
			}
			else{
				return {
				...filter,
				checked: false
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
