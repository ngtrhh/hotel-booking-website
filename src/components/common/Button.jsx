import React from "react";
import PropTypes from "prop-types";

const Button = (props) => {
  const PreIcon = props.preIcon;
  const PostIcon = props.postIcon;
  return (
    <div
      className={`button ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.preIcon && <PreIcon />}
      <span>{props.children}</span>
      {props.postIcon && <PostIcon />}
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
