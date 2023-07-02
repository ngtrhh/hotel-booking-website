import React from "react";
import Logo from "../../Logo";
import Button from "../../Button";
import {
  BsGeoAlt,
  BsMailbox,
  BsTelephone,
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsSendFill,
  BsCalendar2
} from "react-icons/bs";
import { Input, Slider } from "antd";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";

const PriceFilter = () => {
	const dataProvided = useContext(AppContext)
	const [priceInput, setPriceInput] = [dataProvided.priceInput, dataProvided.setPriceInput];
	
	const handleSliderOnChange = (value) => {
		setPriceInput(value);
	}
  	return (
		<div className="results__filter__price-filter">
			<div className="results__filter__price-filter__price-input">
				<div className="results__filter__price-filter_price-input__header">
					<div className="results__filter__price-filter__price-input__header__title">Giá</div>
					<div className="results__filter__price-filter__price-input__header__description">
						Giá phòng mỗi đêm
					</div>
				</div>
				<div className="results__filter__price-filter__price-input__txb">
					<Input id="minPrice" value={priceInput[0]} suffix="đ" className="price-filter__input"/>
					<div className="results__filter__price-filter__line"></div>
					<Input id="maxPrice" value={priceInput[1]} suffix="đ" className="results__filter__price-filter__input"/>
				</div>
			</div>
			<Slider
				formatter={value => `${value}đ`}
				className="results__filter__price-filter__slider"
				range
				min={0} 
				max={20000000}
				step={200000}
				defaultValue={[0, 20000000]}
				onChange={(value) => handleSliderOnChange(value)}
			/>
		</div>
 	 );
};

export default PriceFilter;
