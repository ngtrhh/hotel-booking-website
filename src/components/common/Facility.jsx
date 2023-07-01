import React from "react";

const Facility = (props) => {
  return (
    <div className="facility">
      {props.icon} <span>{props.content}</span>
    </div>
  );
};

export default Facility;
