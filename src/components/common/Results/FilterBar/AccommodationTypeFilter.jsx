import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../../Context/AppProvider';
import FilterCheckbox from './FilterCheckbox'


const AccommodationTypeFilter = () => {
  const dataProvided = useContext(AppContext);
	const [checkboxValues, setCheckboxValues] = [dataProvided.accommodationTypeFilter, dataProvided.setAccommodationTypeFilter];

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