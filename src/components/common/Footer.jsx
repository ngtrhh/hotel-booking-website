import React from "react";
import {
  BsGeoAlt,
  BsMailbox,
  BsTelephone,
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsSendFill,
} from "react-icons/bs";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__top__left">
            <div className="footer__top__left__item">
              <div className="footer__top__left__item__icon">
                <BsGeoAlt size={24} />
              </div>
              <div className="footer__top__left__item__infor">
                Công ty Cổ phần Lokastay Việt Nam. 123, Đường số 6, Khu phố Linh
                Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh, Việt Nam.
              </div>
            </div>
            <div className="footer__top__left__item">
              <div className="footer__top__left__item__icon">
                <BsMailbox size={24} />
              </div>
              <div className="footer__top__left__item__infor">
                cskh.lokastay@gmail.com.
              </div>
            </div>
            <div className="footer__top__left__item">
              <div className="footer__top__left__item__icon">
                <BsTelephone size={24} />
              </div>
              <div className="footer__top__left__item__infor">0123456789.</div>
            </div>
          </div>
          <div className="footer__top__center">
            <div className="footer__top__center__row">
              <Logo />
            </div>
            <div className="footer__top__center__row">
              <div className="footer__top__center__row__media">
                <BsFacebook size={32} />
              </div>
              <div className="footer__top__center__row__media white">
                <BsTwitter size={16} />
              </div>
              <div className="footer__top__center__row__media">
                <BsLinkedin size={32} />
              </div>
              <div className="footer__top__center__row__media white">
                <BsInstagram size={20} />
              </div>
            </div>
            <div className="footer__top__center__row">
              <input
                className="footer__top__center__row__input"
                placeholder="Nhập địa chỉ email"
              />
              <div className="footer__top__center__row__button">
                <BsSendFill size={24} />
              </div>
            </div>
          </div>
          <div className="footer__top__right">
            <div className="footer__top__right__column">
              <div className="footer__top__right__column__title">
                Về Lokastay
              </div>
              <div className="footer__top__right__column__link">Giới thiệu</div>
              <div className="footer__top__right__column__link">Liên hệ</div>
              <div className="footer__top__right__column__link">Tuyển dụng</div>
              <div className="footer__top__right__column__link">Tin tức</div>
            </div>
            <div className="footer__top__right__column">
              <div className="footer__top__right__column__title">Sản phẩm</div>
              <div className="footer__top__right__column__link">Khách sạn</div>
              <div className="footer__top__right__column__link">Căn hộ</div>
              <div className="footer__top__right__column__link">Biệt thự</div>
              <div className="footer__top__right__column__link">Homestay</div>
              <div className="footer__top__right__column__link">Khác</div>
            </div>
            <div className="footer__top__right__column">
              <div className="footer__top__right__column__title">
                Chính sách
              </div>
              <div className="footer__top__right__column__link">
                Điều khoản & Điều kiện
              </div>
              <div className="footer__top__right__column__link">
                Chính sách quyền riêng tư
              </div>
              <div className="footer__top__right__column__link">
                Quy chế hoạt động
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>Copyright © 2023 Lokastay</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
