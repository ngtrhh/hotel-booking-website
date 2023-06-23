import React, { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox'


const BedTypeFilter = () => {
  
	const [checkboxValues, setCheckboxValues] = useState([
		{ name: 'singleBed', label: 'Giường đơn', checked: false },
		{ name: 'twinBeds', label: 'Hai giường đơn', checked: false },
		{ name: 'doubleBed', label: 'Giường đôi', checked: false },
		{ name: 'kingBed', label: 'Giường đôi lớn', checked: false }
	]);

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


  return (
    <div className="results__filter__bed-type-filter">
      	<div className="results__filter__checkbox-filter">
        	<div className="results__filter__checkbox-filter__header">
				Loại giường
        	</div>
			<div className="results__filter__checkbox-filter__content">
				{checkboxValues.map(checkbox => (
					<FilterCheckbox
					key={checkbox.name}
					text={checkbox.label}
					checked={checkbox.checked}
					onChange={() => handleCheckboxChange(checkbox.name)}
					/>
				))}
			</div>
      </div>
    </div>
  )
}

export default BedTypeFilter