import React from 'react'
import { Checkbox } from 'antd';

const FilterCheckbox = (props) => {
  return (
    <div className="filter-checkbox">
      <Checkbox checked={props.checked}
        onChange={props.onChange}
        defaultChecked={false}>
          {props.text}
      </Checkbox>
    </div>
  )
}

export default FilterCheckbox