import React, { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox'


const PaymentFilter = () => {
  
	const [checkboxValues, setCheckboxValues] = useState([
		{ name: 'freeCancellation', label: 'Hủy phòng miễn phí', checked: false },
		{ name: 'payLater', label: 'Đặt trước, trả tiền sau', checked: false },
		{ name: 'payAtProperty', label: 'Thanh toán tại nơi ở', checked: false },
		{ name: 'payNow', label: 'Trả tiền ngay', checked: false },
		{ name: 'creditCardNotRequired', label: 'Đặt không cần thẻ tín dụng', checked: false },
		{ name: 'noDepositRequired', label: 'Đặt phòng không cần đặt cọc', checked: false },
		{ name: 'ewalletPayment', label: 'Thanh toán bằng ví điện tử', checked: false },
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