import React, { useContext } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
} from "firebase/auth";
import { ReactComponentElement as BackBtn } from "../assets/images/back-btn.svg";
import { Input } from "antd";
import { Button } from "antd";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { ReactComponent as FbIcon } from "../assets/images/fb_icon.svg";
import { ReactComponent as GgIcon } from "../assets/images/gg_icon.svg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { addDocument, generateKeywords } from "../firebase/services";
import { AppContext } from "../Context/AppProvider";
import { LoginWithGgFb } from "../firebase/services";
import Helmet from "../components/common/Helmet";

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export const Register = () => {
  const dataProvided = useContext(AppContext);
  const { isLoggedIn } = dataProvided;
  let navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  const SignUp = () => {
    const email = document.querySelector("#register-email-input").value;
    const password = document.querySelector("#register-password-input").value;
    const rePassword = document.querySelector(
      "#register-repassword-input"
    ).value;

    if (CheckPassword(email, password, rePassword)) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if(getAdditionalUserInfo(userCredential).isNewUser){
          console.log(generateKeywords(user.displayName));
					const data = {
						uid: user.uid,
						displayName: user.email.replace('@gmail.com', ''),
						email: user.email,
						photoURL: user.photoURL,
						providerId: user.providerId,
						createdAt: user.metadata.createdAt,
						keywords: generateKeywords(user.displayName),
            lovedRoomsId: [],
            phoneNumber: user.phoneNumber,
            dob: null,
            sex: null,
            address: null
					}
					addDocument("users", data);
				}
        setTimeout(() => {
          navigate('/');
        }, 3500);
        ShowMessage('Success');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ShowMessage('AccountExisted');
        console.log(error);
        // ..
      });
    }
  };
  const LoginWithOtherMethod = (methodType) => {
    auth.signOut();
    LoginWithGgFb(methodType);
  };
  React.useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/");
      }, 3500);
      ShowMessage("Success");
    }
  }, [isLoggedIn]);

  const CheckPassword = (email, password, rePassword) => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Kiểm tra email
    if (!gmailRegex.test(email)) {
      ShowMessage("EmailInvalid");
      return false;
    }

    // Kiểm tra mật khẩu
    if (!passwordRegex.test(password)) {
      ShowMessage("InvalidPassword");
      return false;
    }

    // Kiểm tra nhập lại mật khẩu
    if (password !== rePassword) {
      ShowMessage("PasswordNotMatch");
      return false;
    }
    ShowMessage("Loading");
    return true; // Trả về null nếu mật khẩu và nhập lại mật khẩu hợp lệ
  };

  const ShowMessage = (type) => {
    if (type == "EmailInvalid") {
      messageApi.open({
        key,
        type: "error",
        content: "Email không hợp lệ!",
      });
    }
    if (type == "InvalidPassword") {
      messageApi.open({
        key,
        type: "error",
        content: "Mật khẩu không hợp lệ!",
      });
    }
    if (type == "PasswordNotMatch") {
      messageApi.open({
        key,
        type: "error",
        content: "Mật khẩu không khớp!",
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
        content: "Đăng ký thành công!",
        duration: 2,
      });
    }
    if (type == "AccountExisted") {
      messageApi.open({
        key,
        type: "error",
        content: "Tài khoản đã tồn tại!",
      });
    }
  };

  return (
    <Helmet title="Đăng ký tài khoản">
      <div className="register-container">
        <div className="register-content">
          <div className="register-content-container">
            <div
              onClick={() => {
                window.history.go(-1);
                return false;
              }}
              className="register-content__back-btn"
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
            <div className="register-content__register-form">
              <div className="register-content__register-form__title">
                Đăng ký tài khoản
              </div>
              <div className="register-content__register-form__input-fields">
                <div className="register-input-txb email">
                  <div className="register-input-txb__title">Địa chỉ email</div>
                  <Input id="register-email-input" placeholder="Email" />
                </div>
                <div className="register-input-txb password">
                  <div className="register-input-txb__title">Mật khẩu</div>
                  <Input.Password
                    id="register-password-input"
                    placeholder="Mật khẩu"
                  />
                  <div className="register-input-txb__more-infor">
                    Mật khẩu bao gồm 8 ký tự, trong đó có chữ hoa, chữ thường và
                    số.
                  </div>
                </div>
                <div className="register-input-txb re-password">
                  <div className="register-input-txb__title">
                    Nhập lại mật khẩu
                  </div>
                  <Input.Password
                    id="register-repassword-input"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
              </div>
              <div className="register-content__register-form__footer">
                {contextHolder}
                <Button
                  type="primary"
                  id="register-btn"
                  className="ant-primary-btn"
                  onClick={SignUp}
                >
                  Đăng ký
                </Button>
                <div className="register-term-and-con">
                  <p>
                    Bằng việc đăng ký, tôi đồng ý với&nbsp;
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
                <div className="register-content__devider">
                  <div className="register-content__devider__line"></div>
                  <p>Hoặc</p>
                  <div className="register-content__devider__line"></div>
                </div>
                <div className="register-content__other-signup-methods">
                  <div
                    className="register-content__signup-btn"
                    onClick={() => {
                      LoginWithOtherMethod("Facebook");
                    }}
                  >
                    <FbIcon />
                    <p>Facebook</p>
                  </div>
                  <div
                    className="register-content__signup-btn"
                    onClick={() => {
                      LoginWithOtherMethod("Google");
                    }}
                  >
                    <GgIcon />
                    <p>Google</p>
                  </div>
                </div>
                <div className="register-content__devider__line outside"></div>
                <Button
                  className="ant-default-btn"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Bạn đã có tài khoản? Đăng nhập
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
