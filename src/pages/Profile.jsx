import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import image from "../assets/images/ImageBanner.png";
import { BsCamera } from "react-icons/bs";
export const Profile = () => {
  return (
    <div className="profile">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
      </Breadcrumb>

      <div className="two-contents">
        <div className="side-menu">
          <div className="item selected">Thông tin cá nhân</div>
          <div className="item">Thông tin tài khoản</div>
          <div className="item">Thông tin thanh toán</div>
        </div>

        <div className="side-main">
          <div className="title">
            <span>Thông tin cá nhân</span>
            <div className="avatar">
              <img src={image} />
              <div className="blur">
                <BsCamera size={24} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row__title">Họ tên</div>
            <div className="row__content">Nguyễn Văn A</div>
          </div>
          <div className="row">
            <div className="row__title">Email</div>
            <div className="row__content">nguyenvana123@gmail.com</div>
          </div>
          <div className="row">
            <div className="row__title">Số điện thoại</div>
            <div className="row__content">0123456789</div>
          </div>
          <div className="row">
            <div className="row__title">Ngày sinh</div>
            <div className="row__content">21/09/2002</div>
          </div>
          <div className="row">
            <div className="row__title">Giới tính</div>
            <div className="row__content">Nam</div>
          </div>
          <div className="row">
            <div className="row__title">Địa chỉ</div>
            <div className="row__content">
              90 đường 9, phường B, TP.HCM, Việt Nam
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
