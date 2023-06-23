import React from "react";
import Logo from "../../Logo";
import Button from "../../Button";
import {
  
} from "react-icons/bs";
import { Input, Slider } from "antd";
import { useState, useEffect } from "react";
import StarItem from "./StarItem";

const StarFilter = () => {
	
	const [starFilterChoices, setStarFilterChoices] = useState([
		{ name: '_2star', label: '2', checked: false },
		{ name: '_3star', label: '3', checked: false },
		{ name: '_4star', label: '4', checked: false },
		{ name: '_5star', label: '5', checked: false }
	]);
	const handleFilterChange = (name) => {
		const updatedFilterChoices = starFilterChoices.map((filter) => {
		  	if (filter.name === name) {
				return {
					...filter,
					checked: !filter.checked
				};
			}
		  	return filter;
		});
		setStarFilterChoices(updatedFilterChoices);
	};

	const HandleUncheckedAll = () => {
		const updatedFilterChoices = starFilterChoices.map((filter) => ({
			...filter,
			checked: false
		}));
		setStarFilterChoices(updatedFilterChoices);
	};


  	return (
		<div className="results__filter__starfilter">
			<div className="results__filter__starfilter__header">
				<div className="results__filter__starfilter__header__text">
					Xếp hạng sao
				</div>
				<div onClick={HandleUncheckedAll} className="filter-remove-choice-btn">
					Xóa
				</div>
			</div>
			<div className="results__filter__starfilter__items-container">
				{starFilterChoices.map(data => (
					<StarItem
						key={data.name}
						label={data.label}
						checked={data.checked}
						onClick={() => handleFilterChange(data.name)}
					/>
				))}
			</div>
		</div>
	);
};

export default StarFilter;
