import React, { useEffect, useState, useRef } from "react";

export const Input = (props) => {
  const [error, setError] = useState(props.error ? props.error : "hidden");
  const disable = props.disable;

  const inputRef = useRef(null);

  useEffect(() => {
    if (disable) setError(null);
  }, []);

  useEffect(() => {
    if(props.focus && !disable){
      inputRef.current.focus();
    }
  }, [props.focus]);

  return (
    <div id="input">
      <div className="label">
        <span>{props.label}</span>
        <div className="require">*</div>
      </div>
      <input
        ref={inputRef}
        name={props.name}
        className={disable && "disable"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        readOnly={disable}
        id={props.id}
      />
      <div
        className={error === "hidden" ? "description" : "description error"}
        style={{ visibility: error === "hidden" ? error : "visible" }}
      >
        {props.description
          ? props.description
          : error === "hidden"
          ? error
          : props.error}
      </div>
    </div>
  );
};
