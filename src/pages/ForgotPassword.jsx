import React from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ReactComponentElement as BackBtn } from "../assets/images/back-btn.svg";
import { Input } from "antd";
import { Button } from "antd";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { ReactComponent as FbIcon } from "../assets/images/fb_icon.svg";
import { ReactComponent as GgIcon } from "../assets/images/gg_icon.svg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";
import Helmet from "../components/common/Helmet";

export const ForgotPassword = () => {
  let navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const SendResetPasswordMail = () => {
    const email = document.querySelector("#forgot-password-email-input").value;
    if (CheckInput(email)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          ShowMessage("Success");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  };

  const CheckInput = (email) => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    if (email.replace(/\s/g, "") == "") {
      ShowMessage("Empty");
      return false;
    }
    // Kiểm tra email
    if (!gmailRegex.test(email)) {
      ShowMessage("Invalid");
      return false;
    }
    ShowMessage("Loading");
    return true; // Trả về true nếu email hợp lệ
  };

  const ShowMessage = (type) => {
    if (type == "Empty") {
      messageApi.open({
        key,
        type: "error",
        content: "Vui lòng nhập đầy đủ thông tin!",
      });
    }
    if (type == "Loading") {
      messageApi.open({
        key,
        type: "loading",
        content: "Đang tải...",
      });
    }
    if (type == "Success") {
      messageApi.open({
        key,
        type: "success",
        content:
          "Email đặt lại mật khẩu đã được gửi, vui lòng kiểm tra hòm thư!",
        duration: 3,
      });
    }
    if (type == "Invalid") {
      messageApi.open({
        key,
        type: "error",
        content: "Địa chỉ email không hợp lệ!",
      });
    }
  };

  return (
    <Helmet title="Quên mật khẩu">
      <div className="forgot-password-container">
        <div className="forgot-password-content">
          <div className="forgot-password-content-container">
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="forgot-password-content__back-btn"
            >
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M6.41475 0.296834L0.202765 6.94591C0.129032 7.02507 0.0769276 7.11082 0.0464514 7.20317C0.0154837 7.29551 0 7.39446 0 7.5C0 7.60554 0.0154837 7.70449 0.0464514 7.79683C0.0769276 7.88918 0.129032 7.97493 0.202765 8.05409L6.41475 14.723C6.58679 14.9077 6.80184 15 7.05991 15C7.31797 15 7.53917 14.9011 7.7235 14.7032C7.90783 14.5053 8 14.2744 8 14.0106C8 13.7467 7.90783 13.5158 7.7235 13.3179L2.30415 7.5L7.7235 1.68206C7.89555 1.49736 7.98157 1.26992 7.98157 0.999737C7.98157 0.729024 7.8894 0.494723 7.70507 0.296834C7.52074 0.0989446 7.30568 -5.83348e-07 7.05991 -5.83348e-07C6.81413 -5.83348e-07 6.59908 0.0989446 6.41475 0.296834Z"
                  fill="#595B5E"
                />
              </svg>
              Trở về
            </div>
            <div className="forgot-password-content__forgot-password-form">
              <div className="forgot-password-content__forgot-password-form__title">
                Quên mật khẩu
              </div>
              <div className="forgot-password-content__forgot-password-form__input-fields">
                <div className="forgot-password-input-txb email">
                  <div className="forgot-password-input-txb__title">
                    Địa chỉ email
                  </div>
                  <Input id="forgot-password-email-input" placeholder="Email" />
                  <div className="forgot-password-input-txb__more-infor">
                    Để đặt lại mật khẩu của mình, hãy nhập địa chỉ Email đã đăng
                    ký của bạn.
                  </div>
                </div>
              </div>
              <div className="forgot-password-content__forgot-password-form__footer">
                {contextHolder}
                <Button
                  type="primary"
                  id="forgot-password-btn"
                  className="ant-primary-btn"
                  onClick={SendResetPasswordMail}
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-right"></div>
      </div>
    </Helmet>
  );
};
