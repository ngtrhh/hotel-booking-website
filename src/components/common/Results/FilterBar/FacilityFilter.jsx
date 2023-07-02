import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../../Context/AppProvider';
import FilterCheckbox from './FilterCheckbox'


const FacilityFilter = () => {
	const dataProvided = useContext(AppContext);
	const [checkboxValues, setCheckboxValues] = [dataProvided.facilityFilter, dataProvided.setFacilityFilter];

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