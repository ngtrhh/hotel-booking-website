import React, { useContext, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import image from "../assets/images/ImageBanner.png";
import { BsCamera } from "react-icons/bs";
import Button from "../components/common/Button";
import {AppContext} from "../Context/AppProvider"

export const Profile = () => {
  const data = useContext(AppContext);
  const {user} = data;
  useEffect(() =>{
    console.log(user);
  }, [user]);
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
          <div className="item selected">Thông tin cá nhân</div>
          <Link to={'/account-info'}>
            <div className="item">Thông tin tài khoản</div>
          </Link>
          
          <div className="item">Thông tin thanh toán</div>
        </div>

        <div className="side-main">
          <div className="title">
            <span>Thông tin cá nhân</span>
            <div className="avatar">
              <img src={user.photoURL} />
              <div className="blur">
                <BsCamera size={24} />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="row">
              <div className="row__title">Họ tên</div>
                  <div className="row__content">{(user.lastName || 'Chưa') + ' ' + (user.firstName || 'đặt')}</div>
            </div>
            <div className="row">
              <div className="row__title">Email</div>
              <div className="row__content">{user.email}</div>
            </div>
            <div className="row">
              <div className="row__title">Số điện thoại</div>
              <div className="row__content">{user.phoneNumber || 'Không có'}</div>
            </div>
            <div className="row">
              <div className="row__title">Ngày sinh</div>
              <div className="row__content">{user.dob || "Không có"}</div>
            </div>
            <div className="row">
              <div className="row__title">Giới tính</div>
              <div className="row__content">{user.sex || "Không có"}</div>
            </div>
            <div className="row">
              <div className="row__title">Địa chỉ</div>
              <div className="row__content">
                {user.address || 'Không có'}
              </div>
            </div>
          </div>
          <div className="flex-end">
            <Link to="/edit-profile">
              <Button className="cyan">Chỉnh sửa</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
