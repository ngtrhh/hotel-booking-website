import React, { useState, useRef, useEffect, useContext } from "react";
import { Breadcrumb, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/ImageBanner.png";
import { BsCamera, BsChevronDown } from "react-icons/bs";
import Button from "../components/common/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import { addYears } from "date-fns";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";
import { AppContext } from "../Context/AppProvider";


const genderList = [
  { id: 1, value: "Nam" },
  { id: 2, value: "Nữ" },
];
const maxDate = new Date();
const minDate = addYears(new Date(), -100);
export const EditProfile = () => {
  const dataProvided = useContext(AppContext);
  const {user} = dataProvided;
  const [lastName, setLastName] = useState("Nguyễn");
  const [firstName, setFirstName] = useState("Văn A");
  const [gender, setGender] = useState(genderList[0].value);
  const [email, setEmail] = useState("nguyenvana123@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("0123456789");
  const [birthDate, setBirthDate] = useState(dayjs("2022-04-17"));
  const [address, setAddress] = useState(
    "90 đường 9, phường B, TP.HCM, Việt Nam"
  );
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setLastName(user.lastName);
    setFirstName(user.firstName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setBirthDate(dayjs(dayjs(user.dob, 'DD/MM/YYYY').format('YYYY-MM-DD')));
    setGender(user.sex);
    setAddress(user.address)
  }, [user]);

  //   const errorMessage = React.useMemo(() => {
  //     switch (error) {
  //       case "maxDate": {
  //         return "Ngày sinh không hợp lệ";
  //       }

  //       case "minDate": {
  //         return "Ngày sinh không hợp lệ";
  //       }

  //       case "invalidDate": {
  //         return "Ngày sinh không hợp lệ";
  //       }

  //       default: {
  //         return "";
  //       }
  //     }
  //   }, [error]);

  const handleUpdate = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      message.error("Địa chỉ email không hợp lệ!");
    else if (error) message.error("Ngày sinh không hợp lệ!");
    else if (
      lastName === "" ||
      firstName === "" ||
      email === "" ||
      phoneNumber === "" ||
      address === ""
    ) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
    } else {
      message.success("Bạn đã cập nhật thông tin thành công!");
      const userInfoRef = doc(db, "users", user.uid);
      updateDoc(userInfoRef, {
          lastName: document.querySelector('#lastName').value,
          firstName: document.querySelector('#firstName').value,
          email: document.querySelector('#email').value,
          phoneNumber: document.querySelector('#phoneNumber').value,
          dob: birthDate.format("DD/MM/YYYY"),
          sex: gender,
          address: address
        });
      
      navigate("/profile");
    }
  };
  useEffect(() =>{
    console.log(birthDate);
  }, [birthDate]);

  return (
    <div className="account">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/profile">Thông tin cá nhân</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chỉnh sửa</Breadcrumb.Item>
      </Breadcrumb>

      <div className="two-contents">
        <div className="side-menu">
          <div className="item selected">Thông tin cá nhân</div>
          <div className="item">Thông tin tài khoản</div>
          <div className="item">Thông tin thanh toán</div>
        </div>

        <div className="side-main">
          <div className="title">
            <span>Chỉnh sửa thông tin cá nhân</span>
            <div className="avatar">
              <img src={image} />
              <div className="blur">
                <BsCamera size={24} />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="row">
              <div className="row__title">Họ tên</div>
              <div className="row__content two-inputs">
                <div className="item">
                  <div className="item__label">
                    <span>Họ</span>
                    <div className="require">*</div>
                  </div>
                  <input
                    value={lastName}
                    placeholder="Họ"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    id='lastName'
                  />
                </div>
                <div className="item">
                  <div className="item__label">
                    <span>Tên</span>
                    <div className="require">*</div>
                  </div>
                  <input
                    value={firstName}
                    id='firstName'
                    placeholder="Tên"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row__title">Email</div>
              <div className="row__content one-input">
                <div className="item">
                  <div className="item__label">
                    <span>Email</span>
                    <div className="require">*</div>
                  </div>
                  <input
                    value={email}
                    id='email'
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="item__description">
                    Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row__title">Số điện thoại</div>
              <div className="row__content ">
                <div className="item half">
                  <div className="item__label">
                    <span>Số điện thoại</span>
                    <div className="require">*</div>
                  </div>
                  <input
                    id="phoneNumber"
                    value={phoneNumber}
                    placeholder="Số điện thoại"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  <div className="item__description error"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row__title">Ngày sinh</div>
              <div className="row__content half">
                <div className="item">
                  <div className="item__label">
                    <span>Ngày sinh</span>
                    <div className="require">*</div>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      size="small"
                      value={birthDate}
                      onChange={(value) => {
                        setBirthDate(value);
                      }}
                      // helperText={errorMessage}
                      onError={(newError) => setError(newError)}
                      format="DD/MM/YYYY"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(120, 120, 120, 0.5)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(120, 120, 120, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                          "&.MuiFormHelperText-root": {
                            fontSize: "13px",
                          },
                          "&.Mui-error": {
                            fontSize: "13px",
                          },
                        },
                      }}
                      maxDate={maxDate}
                      minDate={minDate}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row__title">Giới tính</div>
              <div className="row__content ">
                <div className="item half">
                  <div className="item__label">
                    <span>Giới tính</span>
                    <div className="require">*</div>
                  </div>
                  <div
                    className="dropdown"
                    onClick={(e) => {
                      setIsOpen(true);
                    }}
                  >
                    <input value={gender} readOnly ref={ref} />
                    <BsChevronDown size={16} className="delete" />
                    {isOpen && (
                      <div id="dropdown" style={{ marginTop: "50px" }}>
                        {genderList.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className={
                                gender === item.value ? "item selected" : "item"
                              }
                              onClick={() => {
                                setGender(item.value);
                              }}
                            >
                              {item.value}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row__title">Địa chỉ</div>
              <div className="row__content one-input">
                <div className="item">
                  <div className="item__label">
                    <span>Địa chỉ</span>
                    <div className="require">*</div>
                  </div>
                  <input
                    value={address}
                    placeholder="Địa chỉ"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-end">
            <Button className="cyan" onClick={handleUpdate}>
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
