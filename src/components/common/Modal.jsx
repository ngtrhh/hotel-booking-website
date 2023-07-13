import React from "react";

const Modal = () => {
  return (
    <div className="modal">
      <div className="title">Bạn có chắc chắn muốn hủy phòng?</div>
      <div>
        <button onClick={() => close()}>Close modal</button>
      </div>
    </div>
  );
};

export default Modal;
