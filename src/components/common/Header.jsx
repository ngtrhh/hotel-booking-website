import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppProvider";
import { auth } from "../../firebase/config";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Avatar, Popconfirm } from "antd";
import {
  BiChevronDown,
  BiChevronRight,
  BiBookBookmark,
  BiUser,
  BiLogOut,
} from "react-icons/bi";
import { useState } from "react";

const Header = () => {
  const pathname = window.location.pathname;
  const data = useContext(AppContext);
  const isLoggedIn = data.isLoggedIn ? data.isLoggedIn : false;
  const user = data.user;
  const navigate = useNavigate();

  const {isUserDropdown, setIsUserDropdown} = data;

  const LogOut = () => {
    auth.signOut();
  };
  const ToggleDropdown = () => {
    setIsUserDropdown(!isUserDropdown);
  };
  useEffect(() => {
    const dropdownMenu = document.querySelector("#header__user-dropdown");
    const dropdownMenuItems = document.querySelector(
      "#header-user-dropdown-items"
    );

    if (dropdownMenu) {
      dropdownMenu.style.backgroundColor = isUserDropdown
        ? "white"
        : "transparent";
      dropdownMenuItems.style.display = isUserDropdown ? "flex" : "none";
      dropdownMenuItems.style.animation = isUserDropdown
        ? "fadeIn 0.3s"
        : "fadeOut 0.3s";
    }
  }, [isUserDropdown]);

  useEffect(() => {
    if (!isLoggedIn) {
      const dropdownMenu = document.querySelector("#header__login-signup");
      dropdownMenu.style.backgroundColor = "transparent";
    }
  }, [isLoggedIn]);

  const goBookingHistory = () => { 
    ToggleDropdown();
    navigate('/booking-history');
  }

  const goProfile = () => { 
    ToggleDropdown();
    navigate('/profile');
  }

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       setNavBar(true);
  //     } else {
  //       setNavBar(false);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("scroll", null);
  //   };
  // }, []);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <Logo small />
        </div>
        <div className="header__menu">
          <Link to="/">
            <div className={`header__menu__item ${pathname === '/' ? 'active' : ''}`}>
              <span>Trang chủ</span>
              <div className="line" />
            </div>
          </Link>
          <Link to={'/favourite'}>
            <div className={`header__menu__item ${pathname === '/favourite' ? 'active' : ''}`}>
              <span>Yêu thích</span>
              <div className="line" />
            </div>
          </Link>
          <div className="header__menu__item">
            <span>Về Lokastay</span>
            <div className="line" />
          </div>
          <div className="header__menu__item">
            <span>Liên hệ</span>
            <div className="line" />
          </div>
        </div>
        {isLoggedIn ? (
          <div className="header__user-dropdown" id="header__user-dropdown">
            <div
              className="header__user-dropdown__main"
              onClick={ToggleDropdown}
            >
              <Avatar src={user ? user.photoURL : ""}></Avatar>
              <p>{user.displayName}</p>
              {isUserDropdown ? (
                <BiChevronDown className="header__user-dropdown__arrow" />
              ) : (
                <BiChevronRight className="header__user-dropdown__arrow" />
              )}
            </div>

            <div
              className="header__user-dropdown__content"
              id="header-user-dropdown-items"
            >
              <div className="header__user-dropdown__content__item" onClick={goBookingHistory}>
                <BiBookBookmark className="header__user-dropdown__content__item__icon" />
                <p>Phòng đã đặt</p>
              </div>
              <div className="header__user-dropdown__content__item" onClick={goProfile}>
                <BiUser className="header__user-dropdown__content__item__icon" />
                <p>Tài khoản</p>
              </div>
              <Popconfirm
                title="Thông báo"
                description="Bạn có muốn đăng xuất?"
                onConfirm={LogOut}
                okText="Có"
                cancelText="Không"
              >
                <div className="header__user-dropdown__content__item log-out">
                  <BiLogOut className="header__user-dropdown__content__item__icon" />
                  <p>Đăng xuất</p>
                </div>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <div className="header__login-signup" id="header__login-signup">
            <Link to="/login">
              <Button className="no-background">Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button className="cyan">Đăng ký</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
