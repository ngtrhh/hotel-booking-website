import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../../Context/AppProvider';
import FilterCheckbox from './FilterCheckbox'


const PaymentFilter = () => {
	const dataProvided = useContext(AppContext);
	const [checkboxValues, setCheckboxValues] = [dataProvided.paymentFilter, dataProvided.setPaymentFilter];

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
    <div className="results__filter__payment-filter">
      	<div className="results__filter__checkbox-filter">
        	<div className="results__filter__checkbox-filter__header">
				Thanh toán
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

export default PaymentFilter