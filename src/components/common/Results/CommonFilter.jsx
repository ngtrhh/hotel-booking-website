import React from 'react'
import FilterCheckbox from './FilterCheckbox'
import { Checkbox, Divider } from 'antd';
import { useState } from 'react';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Bao gồm bữa sáng', 'Hủy phòng miễn phí', 'Đặt trước, trả tiền sau', 'Giường đơn'];
const defaultCheckedList = [];


const CommonFilter = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div className="results__filter__commonfilter">
      <div className="results__filter__commonfilter__header">
        Bộ lọc phổ biến
      </div>
      <div className="results__filter__commonfilter__content">
        <FilterCheckbox text="Bao gồm bữa sáng"/>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          Chọn tất cả
        </Checkbox>
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </div>
    </div>
  )
}

export default CommonFilter