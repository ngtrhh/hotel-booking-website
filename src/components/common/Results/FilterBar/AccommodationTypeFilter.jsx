import React, { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox'


const AccommodationTypeFilter = () => {
  
	const [checkboxValues, setCheckboxValues] = useState([
		{ name: 'hotel', label: 'Khách sạn', checked: false },
		{ name: 'apartment', label: 'Căn hộ', checked: false },
		{ name: 'homestay', label: 'Homestay', checked: false },
		{ name: 'resort', label: 'Resort', checked: false },
		{ name: 'guesthouse', label: 'Nhà nghỉ', checked: false },
		{ name: 'villa', label: 'Biệt thự', checked: false }
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
    <div className="results__filter__accommodationtypefilter">
      <div className="results__filter__checkbox-filter">
        <div className="results__filter__checkbox-filter__header">
          Loại hình lưu trú
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

export default AccommodationTypeFilter