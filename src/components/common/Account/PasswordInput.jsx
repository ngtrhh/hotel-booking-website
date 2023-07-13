import React from "react";

const PasswordInput = (props) => {
  const error = props.error || "hidden";
  return (
    <div className="input">
      {props.label && (
        <div className="label">
          {props.label}
          <div className="require">*</div>
        </div>
      )}
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />
      <div
        className="error"
        style={{ visibility: error === "hidden" ? error : "visible" }}
      >
        {error}
      </div>
    </div>
  );
};

export default PasswordInput;
