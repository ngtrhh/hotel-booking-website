import React from "react";
import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  	const [pageNumbers, setPageNumbers] = useState([]);
	const maxPageNumbersShow = 4;
	const [startPageNumber, setStartPageNumber] = useState(2);
	const totalPage = Math.ceil(totalRooms / roomsPerPage);
	useEffect(() => {
		const LoadPageNumbers = () => {
			setPageNumbers([]);
			let pageNumbersData = [];
			if(totalPage <= 6){
				for(let i = 1; i <= totalPage; i++){
					pageNumbersData.push(i);
				}
			}
			else{
				pageNumbersData.push(1);
				if(startPageNumber - 1 != 1){
					pageNumbersData.push('...')
				}
				for(let i = startPageNumber; i < startPageNumber + maxPageNumbersShow; i++){
					pageNumbersData.push(i);
				}
				if(startPageNumber + maxPageNumbersShow != totalPage){
					pageNumbersData.push('...')
				}
				pageNumbersData.push(totalPage);
			}
			console.log(pageNumbersData);
			setPageNumbers(pageNumbersData);
		};
		
		LoadPageNumbers();
	}, [startPageNumber, currentPage, totalPage]);

	const ChangePageNumbers = (option) => {
		if(option == 'next' && startPageNumber + maxPageNumbersShow - 1 !== totalPage){
			setStartPageNumber(startPageNumber + 1);
		}
		if(option == 'prev' && startPageNumber > 2){
			setStartPageNumber(startPageNumber - 1);
		}
	}
  	return (
		<div className="results-roomlist-pagination">
			<BsChevronDown onClick={() => ChangePageNumbers('prev')} className="results-roomlist-pagination__show-prev-btn"/>
			{pageNumbers.map((number, index) => (
				<div className={`results-roomlist-pagination__item ${
				number === currentPage ? "selected" : ""
				}`} key={index} onClick={() => {
						paginate(number);
						if(number > 2 && (number <= totalPage - 4)){
							setStartPageNumber(number-1);
						}
						else{
							if(number < (totalPage/2)){
								setStartPageNumber(2);
							}
							else{
								setStartPageNumber(totalPage - 4);
							}
						}
					}}>
					{number}
				</div>
			))}
			<BsChevronDown onClick={() => ChangePageNumbers('next')} className="results-roomlist-pagination__show-next-btn"/>
		</div>
  	);
};

export default Pagination;