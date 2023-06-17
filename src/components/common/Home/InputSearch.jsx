import React from "react";

const InputSearch = (props) => {
  const Icon = props.icon;
  return (
    <div className="input">
      <div className="icon">
        <Icon />
      </div>
      <div className="content">
        <div className="label">{props.label}</div>
        <input
          className="value"
          placeholder={props.placeholder}
          value={props.value ? props.value : null}
          style={{ width: props.width }}
        ></input>
      </div>
    </div>
  );
};

export default InputSearch;
