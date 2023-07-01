import React, { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox'


const FacilityFilter = () => {
  
	const [checkboxValues, setCheckboxValues] = useState([
		{ name: 'wifi', label: 'Wifi', checked: false },
		{ name: 'freeBreakfast', label: 'Bữa sáng miễn phí', checked: false },
		{ name: 'pool', label: 'Hồ bơi', checked: false },
		{ name: 'parking', label: 'Chỗ đậu xe', checked: false },
		{ name: 'restaurant', label: 'Nhà hàng', checked: false },
		{ name: '24hReception', label: 'Lễ tân 24h', checked: false },
		{ name: 'elevator', label: 'Thang máy', checked: false },
		{ name: 'airportShuttle', label: 'Đưa đón sân bay', checked: false },
		{ name: 'gym', label: 'Trung tâm thể dục', checked: false },
		{ name: 'dailyCleaning', label: 'Dọn phòng hằng ngày', checked: false },
		{ name: 'meetingRoom', label: 'Phòng họp', checked: false },
		{ name: 'petFriendly', label: 'Cho phép thú cưng', checked: false },
		{ name: 'wheelchairAccessible', label: 'Lối đi cho xe lăn', checked: false },
		{ name: 'bar', label: 'Quầy bar', checked: false },
		{ name: 'gymFacilities', label: 'Phòng tập gym', checked: false },
		{ name: 'bbqFacilities', label: 'Tiệc BBQ', checked: false },
		{ name: 'babysittingServices', label: 'Dịch vụ trông trẻ', checked: false },
		{ name: 'familyFriendly', label: 'Thích hợp cho gia đình/trẻ em', checked: false },
		{ name: 'golfCourse', label: 'Sân golf', checked: false },
		{ name: 'smokingArea', label: 'Khu vực hút thuốc', checked: false },
		{ name: 'massageSpa', label: 'Massage & Spa', checked: false }
	]);

	const [isContentExpanded, setIsContentExpanded] = useState(true);
	  
	

  const handleCheckboxChange = (name) => {
    setCheckboxValues(prevValues => {
      	return prevValues.map(checkbox => {
        	if (checkbox.name === name) {
          		return {
           			...checkbox,
            		checked: !checkbox.checked
          		};
        	}
        	return checkbox;
      	});
    });
	
  };

  	const handleClearAll = () => {
    	setCheckboxValues(prevValues => {
      		return prevValues.map(checkbox => ({
        		...checkbox,
        		checked: false
     		}));
    	});
  	};
	const [visibleCheckboxValues, setVisibleCheckboxValues] = useState(checkboxValues.slice(0, Math.ceil(checkboxValues.length / 2)));
	const handleContentToggle = () => {
		setIsContentExpanded((prevState) => !prevState);
		setVisibleCheckboxValues(
		  isContentExpanded ? checkboxValues.slice(0, Math.ceil(checkboxValues.length / 2)) : checkboxValues
		);
	  };


  return (
    <div className="results__filter__facility">
      	<div className="results__filter__checkbox-filter">
			<div className="results__filter__checkbox-filter__header">
				<div className='results__filter__checkbox-filter__header__text'>Tiện nghi</div>
				<div className='filter-remove-choice-btn' onClick={handleClearAll}>Xóa</div>
        	</div>
			<div className={`results__filter__checkbox-filter__content ${isContentExpanded ? 'expanded' : ''}`}>
				{checkboxValues.map(checkbox => (
				<FilterCheckbox
					key={checkbox.name}
					text={checkbox.label}
					checked={checkbox.checked}
					onChange={() => handleCheckboxChange(checkbox.name)}
				/>
				))}
				<div className='btn-hide-content-filter' onClick={handleContentToggle}>{isContentExpanded ? 'Rút gọn' : 'Hiển thị thêm'}</div>
        	</div>
      	</div>
    </div>
  )
}

export default FacilityFilter