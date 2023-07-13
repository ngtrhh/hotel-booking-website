import React, { useEffect, useState } from "react";

export const Input = (props) => {
  const [error, setError] = useState(props.error ? props.error : "hidden");
  const disable = props.disable;

  useEffect(() => {
    if (disable) setError(null);
  }, []);

  return (
    <div id="input">
      <div className="label">
        <span>{props.label}</span>
        <div className="require">*</div>
      </div>
      <input
        name={props.name}
        className={disable && "disable"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        readOnly={disable}
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
