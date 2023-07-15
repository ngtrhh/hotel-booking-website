import React, { useContext } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ReactComponentElement as BackBtn } from "../assets/images/back-btn.svg";
import { Input } from 'antd';
import {Button} from "antd";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { ReactComponent as FbIcon } from '../assets/images/fb_icon.svg';
import { ReactComponent as GgIcon } from '../assets/images/gg_icon.svg';
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginWithGgFb } from "../firebase/services";
import { useState, useEffect } from "react";
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { addDocument, generateKeywords } from "../firebase/services";
import { AppContext } from "../Context/AppProvider";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export const Login = () => {
  const dataProvided = useContext(AppContext);
  const {isLoggedIn} = dataProvided;
  let navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const LoginWithEmailPassword = () => {
    const email = document.querySelector('#login-email-input').value;
    const password = document.querySelector('#login-password-input').value;

    if(CheckInput(email, password)){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.reload();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ShowMessage('Invalid');
      });
    }
  }

  const LoginWithOtherMethod = (methodType) => {
    auth.signOut();
    LoginWithGgFb(methodType);
  }
  
  React.useEffect(() => {
    if(isLoggedIn){
      setTimeout(() => {
        navigate('/');
      }, 3500);
      ShowMessage('Success');
    }
  }, [isLoggedIn]);
  

  const CheckInput = (email, password) => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;;
    if(email.replace(/\s/g, '') == '' || password.replace(/\s/g, '') == ''){
      ShowMessage('Empty');
      return false;
    }
    // Kiểm tra email
    if (!gmailRegex.test(email)) {
      ShowMessage('Invalid');
      return false;
    }
    ShowMessage('Loading');
    return true; // Trả về true nếu email hợp lệ
  };

  const ShowMessage = (type) => {
    if(type == 'Empty'){
      messageApi.open({
        key,
        type: 'error',
        content: 'Vui lòng nhập đầy đủ thông tin!',
      });
    }
    if(type == 'Loading'){
      messageApi.open({
        key,
        type: 'loading',
        content: 'Đang tải...',
      });
    }
    if(type == 'Success'){
      messageApi.open({
        key,
        type: 'success',
        content: 'Đăng nhập thành công!',
        duration: 3,
      });
    }
    if(type == 'Invalid'){
      messageApi.open({
        key,
        type: 'error',
        content: 'Địa chỉ email hoặc mật khẩu không hợp lệ!',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-content-container">
          <div onClick={() => {window.history.go(-1); return false;}} className="login-content__back-btn">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path id="Vector" d="M6.41475 0.296834L0.202765 6.94591C0.129032 7.02507 0.0769276 7.11082 0.0464514 7.20317C0.0154837 7.29551 0 7.39446 0 7.5C0 7.60554 0.0154837 7.70449 0.0464514 7.79683C0.0769276 7.88918 0.129032 7.97493 0.202765 8.05409L6.41475 14.723C6.58679 14.9077 6.80184 15 7.05991 15C7.31797 15 7.53917 14.9011 7.7235 14.7032C7.90783 14.5053 8 14.2744 8 14.0106C8 13.7467 7.90783 13.5158 7.7235 13.3179L2.30415 7.5L7.7235 1.68206C7.89555 1.49736 7.98157 1.26992 7.98157 0.999737C7.98157 0.729024 7.8894 0.494723 7.70507 0.296834C7.52074 0.0989446 7.30568 -5.83348e-07 7.05991 -5.83348e-07C6.81413 -5.83348e-07 6.59908 0.0989446 6.41475 0.296834Z" fill="#595B5E"/>
            </svg>
            Trở về
          </div>
          <div className="login-content__login-form">
            <div className="login-content__login-form__title">
              Đăng nhập
            </div>
            <div className="login-content__login-form__input-fields">
              <div className="login-input-txb email">
                <div className="login-input-txb__title">
                  Địa chỉ email
                </div>
                <Input id="login-email-input" placeholder="Email" />
              </div>
              <div className="login-input-txb password">
                <div className="login-input-txb__title">
                    Mật khẩu
                </div>
                <Input.Password id="login-password-input" placeholder="Mật khẩu" />
                <p className="login-forgot-password-btn" onClick={() => {navigate('/forgot')}}>Quên mật khẩu</p>
              </div>
            </div>
            <div className="login-content__login-form__footer">
              {contextHolder}
              <Button type="primary" id='login-btn' className="ant-primary-btn" onClick={LoginWithEmailPassword}>
                Đăng nhập
              </Button>
              <div className="login-term-and-con">
                <p>
                  Bằng việc đăng nhập, tôi đồng ý với&nbsp;
                  <span className="span-blue underline">
                    Điều khoản & Điều kiện
                  </span>
                    &nbsp;và 
                  <span className="span-blue">
                    &nbsp;Chính sách quyền riêng tư
                  </span> 
                  &nbsp;của Lokastay.
                </p>
              </div>
              <div className="login-content__devider">
                <div className="login-content__devider__line"></div>
                <p>Hoặc</p>
                <div className="login-content__devider__line"></div>
              </div>
              <div className="login-content__other-signup-methods">
                <div className="login-content__signup-btn" onClick={() => {LoginWithOtherMethod('Facebook')}}>
                  <FbIcon/>
                  <p>Facebook</p>
                </div>
                <div className="login-content__signup-btn" onClick={() => {LoginWithOtherMethod('Google')}}>
                  <GgIcon/>
                  <p>Google</p>
                </div>
              </div>
              <div className="login-content__devider__line outside"></div>
              <Button className="ant-default-btn" onClick={() => {navigate('/register')}}>
                Bạn chưa có tài khoản? Đăng ký
              </Button>
            </div>

          </div>
        </div>
      </div>
      <div className="banner-right">

      </div>
    </div>
  );
};
