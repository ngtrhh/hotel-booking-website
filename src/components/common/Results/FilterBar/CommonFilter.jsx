import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../../Context/AppProvider';
import FilterCheckbox from './FilterCheckbox'


const CommonFilter = () => {
  const dataProvided = useContext(AppContext);
  const [checkboxValues, setCheckboxValues] = [dataProvided.commonFilter ,dataProvided.setCommonFilter];

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
    <div className="results__filter__commonfilter">
      <div className="results__filter__checkbox-filter">
        <div className="results__filter__checkbox-filter__header">
          Bộ lọc phổ biến
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

export default CommonFilter