import React from "react";
import Logo from "./Logo";
import Button from "./Button";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Logo small />
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
          <Button className="no-background">Đăng nhập</Button>
          <Button className="cyan">Đăng ký</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
