import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="profile">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/result">Tài khoản</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Lịch sử đặt phòng</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
