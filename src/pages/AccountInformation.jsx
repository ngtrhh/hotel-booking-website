import React, { useEffect, useState } from "react";
import { Breadcrumb, message } from "antd";
import { Link } from "react-router-dom";
import PasswordInput from "../components/common/Account/PasswordInput";
import Button from "../components/common/Button";
import { db, auth } from "../firebase/config"
import { updatePassword } from "firebase/auth";


export const AccountInformation = () => {
  const [update, setUpdate] = useState(null);
  const [input, setInput] = useState({
    password: "password",
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() =>{
    console.log(input);
  }, [input])

  const validateInput = (e) => {
    console.log(input);
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "oldPassword":
          if (!value) {
            stateObj[name] = "Vui lòng nhập mật khẩu!";
          } else if (value !== input.password) {
            stateObj[name] = "Mật khẩu cũ không phù hợp";
          }
          break;

        case "newPassword":
          if (!value) {
            stateObj[name] = "Vui lòng nhập mật khẩu!";
          } else {
            const valid =
              value.length >= 8 &&
              /[A-Z]/.test(value) &&
              /[^a-zA-Z]/.test(value) &&
              /[0-9]/.test(value);

            if (valid) {
              setInput((prev) => ({
                ...prev,
                [name]: value,
              }));
            } else {
              stateObj[name] =
                "Mật khẩu phải từ 8 ký tự trở lên và có chứa ít nhất 1 ký tự thường, 1 ký tự hoa và 1 ký tự chữ số.";
            }
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Vui lòng nhập xác nhận mật khẩu!";
          } else if (input.newPassword && value !== input.newPassword) {
            stateObj[name] = "Mật khẩu xác nhận không trùng khớp.";
          }
          break;

        default:
        break;
      }

      return stateObj;
    });
  };

  const handleChangePassword = () => {
    // setInput((prev) => ({
    //   ...prev,
    //   oldPassword: input.password,
    //   password: input.newPassword,
    //   newPassword: "",
    //   confirmPassword: "",
    // }));
    // setUpdate(null);
    // setError({
    //   oldPassword: "",
    //   newPassword: "",
    //   confirmPassword: "",
    // });
    
    // if(error.oldPassword !== ""){
    //   message.warning("Mật khẩu cũ không hợp lệ!");
    // }
    // else if (error.newPassword !== ""){
    //   message.warning("Mật khẩu mới không hợp lệ!")
    // }
    // else if (error.confirmPassword !== ""){
    //   message.warning("Mật khẩu mới không khợp!")
    // }
      
    const user = auth.currentUser;
    console.log(input.newPassword);
    updatePassword(user, input.newPassword).then(() => {
      message.success("Đổi mật khẩu thành công!")
      
    }).catch((error) => {
      // An error ocurred
      // ...
    });
};

  const clearChangePassword = () => {
    setUpdate(null);
    setInput((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
    setError({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="account">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin tài khoản</Breadcrumb.Item>
      </Breadcrumb>

      <div className="two-contents">
        <div className="side-menu">
          <Link to="/profile">
            <div className="item">Thông tin cá nhân</div>
          </Link>
          <Link to="/account">
            <div className="item selected">Thông tin tài khoản</div>
          </Link>
          <div className="item">Thông tin thanh toán</div>
        </div>

        <div className="side-main">
          <div className="title">
            <span>Thông tin tài khoản</span>
          </div>
          <div className="wrapper">
            <div className="row">
              <div className="row__title">Mật khẩu</div>
              {update !== "password" ? (
                <div className="row__content two-texts">
                  <input
                    type="password"
                    name="password"
                    value={input.password}
                    readOnly
                  />
                  <div
                    className={update ? "text disable" : "text"}
                    onClick={() => {
                      if (!update) setUpdate("password");
                    }}
                  >
                    Đổi mật khẩu mới
                  </div>
                </div>
              ) : (
                <div className="row__content two-texts">
                  <div className="column">
                    <PasswordInput
                      name="oldPassword"
                      type="password"
                      placeholder="Nhập mật khẩu cũ"
                      onChange={handleInputChange}
                      onBlur={validateInput}
                      error={error.oldPassword}
                    />
                    <PasswordInput
                      name="newPassword"
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      onChange={handleInputChange}
                      onBlur={validateInput}
                      error={error.newPassword}
                    />
                    <PasswordInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      onChange={handleInputChange}
                      onBlur={validateInput}
                      error={error.confirmPassword}
                    />
                  </div>
                  <div className="text">
                    <span onClick={clearChangePassword}>Hủy</span>
                    <Button className="cyan" onClick={handleChangePassword}>
                      Cập nhật
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="row">
              <div className="row__title">Xóa tài khoản</div>
              {update !== "delete" ? (
                <div className="row__content two-texts">
                  <input readOnly value="Xóa tài khoản Destivance vĩnh viễn" />
                  <div
                    className={update ? "text disable" : "text"}
                    onClick={() => {
                      if (!update) setUpdate("delete");
                    }}
                  >
                    Xóa tài khoản
                  </div>
                </div>
              ) : (
                <div className="row__content two-texts">
                  <div className="warning">
                    Bạn có chắc chắn muốn xóa tài khoản?
                    <span>
                      Nếu bạn vẫn muốn xóa tài khoản, vui lòng đảm bảo tất cả
                      yêu cầu đặt chỗ đều đã hoàn thành và bạn không có vấn
                      đề/thắc mắc nào.
                    </span>
                  </div>
                  <div className="text">
                    <span
                      onClick={() => {
                        setUpdate(null);
                      }}
                    >
                      Hủy
                    </span>
                    <Button
                      className="cyan"
                      onClick={() => {
                        message.success("Update status account");
                      }}
                    >
                      Xóa tài khoản
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
