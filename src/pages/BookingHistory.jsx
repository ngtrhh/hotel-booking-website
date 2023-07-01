import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { BsSearch } from "react-icons/bs";
import { HorizontalCard } from "../components/common/BookingHistory/HorizontalCard";

export const BookingHistory = () => {
  return (
    <div className="booking-history">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/result">Tài khoản</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Lịch sử đặt phòng</Breadcrumb.Item>
      </Breadcrumb>
      <div className="search-bar">
        <div className="search-bar__input-wrapper">
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              TÊN CHỖ NGHỈ
            </div>
            <input placeholder="Nhập tên chỗ nghỉ, địa điểm" />
          </div>
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              NGÀY Nhận phòng
            </div>
            <input placeholder="Chọn ngày" readOnly />
          </div>
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              Ngày Trả phòng
            </div>
            <input placeholder="Chọn ngày" readOnly />
          </div>
        </div>
        <Button className="cyan" preIcon={() => <BsSearch size={20} />}>
          Tìm kiếm
        </Button>
      </div>

      <div className="content">
        <div className="menu">
          <div className="menu__item selected">Đặt phòng sắp đến</div>
          <div className="menu__item">Đặt phòng đã qua</div>
          <div className="menu__item">Đặt phòng đã hủy</div>
        </div>

        <div className="main">
          <div className="sort">
            <div className="sort__title">Sắp xếp theo</div>
            <div className="sort__wrapper">
              <div className="sort__wrapper__item selected">Gần nhất</div>
              <div className="sort__wrapper__item">Cũ nhất</div>
              <div className="sort__wrapper__item">Giá cao nhất</div>
              <div className="sort__wrapper__item">Giá thấp nhất</div>
            </div>
          </div>
          <div className="list">
            <HorizontalCard state="passed" />
            <HorizontalCard state="coming" />
            <HorizontalCard state="canceled" />
            <HorizontalCard />
          </div>
        </div>
      </div>
    </div>
  );
};
