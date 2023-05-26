import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <div
      className={`button ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      <span>{props.text}</span>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
