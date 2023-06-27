import React from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ReactComponentElement as BackBtn } from "../assets/images/back-btn.svg";
import { Input } from 'antd';
import Button from "../components/common/Button";

export const Register = () => {

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-content-container">
          <div className="login-content__back-btn">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="Vector" d="M6.41475 0.296834L0.202765 6.94591C0.129032 7.02507 0.0769276 7.11082 0.0464514 7.20317C0.0154837 7.29551 0 7.39446 0 7.5C0 7.60554 0.0154837 7.70449 0.0464514 7.79683C0.0769276 7.88918 0.129032 7.97493 0.202765 8.05409L6.41475 14.723C6.58679 14.9077 6.80184 15 7.05991 15C7.31797 15 7.53917 14.9011 7.7235 14.7032C7.90783 14.5053 8 14.2744 8 14.0106C8 13.7467 7.90783 13.5158 7.7235 13.3179L2.30415 7.5L7.7235 1.68206C7.89555 1.49736 7.98157 1.26992 7.98157 0.999737C7.98157 0.729024 7.8894 0.494723 7.70507 0.296834C7.52074 0.0989446 7.30568 -5.83348e-07 7.05991 -5.83348e-07C6.81413 -5.83348e-07 6.59908 0.0989446 6.41475 0.296834Z" fill="#595B5E"/>
            </svg>
            Trở về
          </div>
          <div className="login-content__login-form">
            <div className="login-content__login-form__title">
              Đăng ký tài khoản
            </div>
            <div className="login-content__login-form__input-fields">
              <div className="register-input-txb email">
                <div className="register-input-txb__title">
                  Địa chỉ email
                </div>
                <Input placeholder="Email" />
              </div>
              <div className="register-input-txb password">
                <div className="register-input-txb__title">
                    Mật khẩu
                </div>
                <Input placeholder="Mật khẩu" />
                <div className="register-input-txb__more-infor">
                  Mật khẩu bao gồm 8 ký tự, trong đó có chữ hoa, chữ thường và số.
                </div>
              </div>
              <div className="register-input-txb re-password">
                <div className="register-input-txb__title">
                  Nhập lại mật khẩu
                </div>
                <Input placeholder="Nhập lại mật khẩu" />
              </div>
            </div>
            <div className="login-content__login-form__footer">
              <Button className='cyan'>Đăng ký</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-right">

      </div>
    </div>
  );
};
