import React, { useState, useEffect, useCallback } from "react";

const ItemOfGuest = (props) => {
  const min = props.min;
  const name = props.name;
  const [value, setValue] = useState({
    [name]: [name] === "guest" ? props.min + 1 : min,
  });
  const [limit, setLimit] = useState(false);

  const updateValue = async (type) => {
    let temp = value[name];
    if (type === "plus") {
      temp = temp + 1;
    } else {
      temp = temp - 1 < min ? min : temp - 1;
    }
    setValue({ [name]: temp });
  };

  const handleGetValue = () => {
    props.getValue(value);
  };

  useEffect(() => {
    //console.log("room:", value[name]);
    handleGetValue();
    if (value[name] === min) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  }, [value]);

  return (
    <div className="item">
      <div className="title">{props.title}</div>
      <div className="control">
        <div
          className={limit ? "control__button disable" : "control__button"}
          onClick={() => {
            !limit && updateValue("minus");
          }}
        >
          -
        </div>
        <input className="control__number-input" value={value[name]} readOnly />
        <div
          className="control__button"
          onClick={() => {
            updateValue("plus");
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default ItemOfGuest;
