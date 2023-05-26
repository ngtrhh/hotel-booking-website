import React from "react";
import Logo from "./Logo";
import Button from "./Button";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__menu">
          <div className="header__menu__item active">
            <span>Trang chủ</span>
            <div className="line" />
          </div>
          <div className="header__menu__item">
            <span>Yêu thích</span>
            <div className="line" />
          </div>
          <div className="header__menu__item">
            <span>Đặt chỗ của tôi</span>
            <div className="line" />
          </div>
          <div className="header__menu__item">
            <span>Về Lokastay</span>
            <div className="line" />
          </div>
          <div className="header__menu__item">
            <span>Liên hệ</span>
            <div className="line" />
          </div>
        </div>
        <div className="header__login-signup">
          <Button text="Đăng nhập" className="login" />
          <Button text="Đăng ký" className="signup cyan" />
        </div>
      </div>
    </div>
  );
};

export default Header;
