import React from "react";

const AdvantageItem = (props) => {
  return (
    <div className="advantage-card">
      <img src={props.image} className="advantage-card__image" />
      <div className="advantage-card__title">{props.title}</div>
      <div className="advantage-card__description">{props.description}</div>
    </div>
  );
};

export default AdvantageItem;
