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
              Ngày Nhận phòng
            </div>
            <input placeholder="Chọn ngày" readOnly />
          </div>
          <div className="search-bar__input-wrapper__item">
            <div className="search-bar__input-wrapper__item__label">
              Ngày Trả Phòng
            </div>
            <input placeholder="Chọn ngày" readOnly />
          </div>
        </div>
        <Button className="cyan" preIcon={() => <BsSearch size={20} />}>
          Tìm kiếm
        </Button>
      </div>

      <div className="two-contents">
        <div className="side-menu">
          <div className="item selected">Đặt phòng sắp đến</div>
          <div className="item">Đặt phòng đã qua</div>
          <div className="item">Đặt phòng đã hủy</div>
        </div>

        <div className="side-main">
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
            <HorizontalCard type="history" state="passed" />
            <HorizontalCard type="history" state="coming" />
            <HorizontalCard type="history" state="canceled" />
          </div>
        </div>
      </div>
    </div>
  );
};
