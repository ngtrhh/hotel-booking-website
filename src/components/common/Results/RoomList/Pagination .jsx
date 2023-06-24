import React from "react";
import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  	const [pageNumbers, setPageNumbers] = useState([]);
	const maxPageNumbersShow = 6;
	const [startPageNumber, setStartPageNumber] = useState(1);
	const totalPage = Math.ceil(totalRooms / roomsPerPage);

	useEffect(() => {
		const LoadPageNumbers = () => {
			setPageNumbers([]);
			let pageNumbersData = [];
			if (totalPage <= 6) {
				for (let i = 1; i <= totalPage; i++) {
					pageNumbersData.push(i);
				}
			} else if(startPageNumber + maxPageNumbersShow - 1 === totalPage){
				for (let i = startPageNumber; i <= totalPage; i++) {
					pageNumbersData.push(i);
				}
			}
			else {
				for (let i = startPageNumber; i <= startPageNumber + 2; i++) {
					pageNumbersData.push(i);
				}
				pageNumbersData.push("...");
				for (let i = totalPage - 2; i <= totalPage; i++) {
					pageNumbersData.push(i);
				}
			}
			setPageNumbers(pageNumbersData);
		};
		
		LoadPageNumbers();
	}, [startPageNumber, currentPage, totalPage]);

	const ChangePageNumbers = (option) => {
		if(option == 'next' && startPageNumber + maxPageNumbersShow - 1 !== totalPage){
			setStartPageNumber(startPageNumber + 1);
		}
		if(option == 'prev' && startPageNumber > 1){
			setStartPageNumber(startPageNumber - 1);
		}
	}
  	return (
		<div className="results-roomlist-pagination">
		<BsChevronDown onClick={() => ChangePageNumbers('prev')} className="results-roomlist-pagination__show-prev-btn"/>
		{pageNumbers.map((number) => (
			<div className={`results-roomlist-pagination__item ${
				number === currentPage ? "selected" : ""
			}`} key={number} onClick={() => paginate(number)}>
			{number}
			</div>
		))}
		<BsChevronDown onClick={() => ChangePageNumbers('next')} className="results-roomlist-pagination__show-next-btn"/>
		</div>
  	);
};

export default Pagination;