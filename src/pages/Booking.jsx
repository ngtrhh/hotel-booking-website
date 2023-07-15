import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  message,
  Steps,
  Alert,
  Modal,
  Button as AntButton,
} from "antd";
import { BiSolidInfoCircle } from "react-icons/bi";
import { format, addDays, differenceInDays, formatDistance } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import vi from "date-fns/locale/vi";
import image from "../assets/images/ImageBanner.png";
import Facility from "../components/common/Facility";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  BsImages,
  BsStarFill,
  BsHeart,
  BsGeoAltFill,
  BsHeartFill,
  BsChevronDown,
  BsBoxArrowInRight,
  BsBoxArrowInLeft,
  BsJournalText,
  BsCreditCard,
  BsPersonFill,
  BsCircle,
  BsRecordCircle,
} from "react-icons/bs";

import {
  MdPool,
  MdOutlineBeachAccess,
  MdTimeToLeave,
  MdWifi,
  MdSmokeFree,
  MdOutlineRoomService,
  MdChildCare,
  MdOutlineBedroomChild,
  MdAttribution,
  MdPets,
  MdLocalBar,
  MdSportsGymnastics,
  MdSportsFootball,
  MdFastfood,
  MdKingBed,
  MdZoomOutMap,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import ResultBooking from "../components/common/Booking/ResultBooking";
import Helmet from "../components/common/Helmet";
const stripePromise = loadStripe(
  "pk_test_51MwSGfItrzk46JwuUcMyEF34q9bXGZTsKJuUSwiWDdvEdtX4ORkDoNxvr1KjqMGbRlMccRoIrmJFuDnfcwHzlCV100YJDhC5Tm"
);

export const Booking = (props) => {
  const navigate = useNavigate();
  const dataProvided = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("type 1");
  const [bankSelected, setBankSelected] = useState(1);
  const [vcbQrImg, setVcbQrImg] = useState();
  const [vtbQrImg, setVtbQrImg] = useState();
  const facilitiesList = [
    "Hồ bơi",
    "Chỗ đậu xe",
    "Quầy bar",
    "Wifi",
    "Phòng gym",
    "Trung tâm thể dục",
    "Thích hợp cho gia đình/trẻ em",
    "Bữa sáng miễn phí",
  ];
  const facilityIcon = [
    MdPool,
    MdTimeToLeave,
    MdLocalBar,
    MdWifi,
    MdSportsGymnastics,
    MdSportsFootball,
    MdChildCare,
    MdFastfood,
  ];
  const [discount, setDiscount] = useState(0);

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Quicksand", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "22px",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontWeight: 500,
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const goTopRef = useRef(null);
  const vcbRef = useRef(null);
  const vtbRef = useRef(null);
  const ScrollToTop = () => {
    goTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const ScrollVCB = () => {
    vcbRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const ScrollVTB = () => {
    vtbRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const {
    user,
    accoms,
    accomData,
    setAccomData,
    rooms,
    setRooms,
    selectedRoomType,
    setSelectedRoomType,
    searchDateRange,
    seacrchNumOfRooms,
    setSeacrchNumOfRooms,
    seacrchNumOfGuest,
    setSeacrchNumOfGuest,
    seacrchNumOfChild,
    setSeacrchNumOfChild,

    bookingName,
    setBookingName,
    bookingEmail,
    setBookingEmail,
    bookingPhone,
    setBookingPhone,
    bookingTax,
    setBookingTax,
    bookingDiscount,
    setBookingDiscount,
    totalBookingPrice,
    setTotalBookingPrice,
    roomsToBook,
    setRoomsToBook,

    cardNumber,
    setCardNumber,
    cardValidDate,
    setCardValidDate,
    cardSecret,
    setCardSecret,
    cardOwnerName,
    setCardOwnerName,
    orderId,
    setOrderId,
    bookingSuccess,
    setBookingSuccess,
  } = dataProvided;
  const [totalPriceString, setTotalPriceString] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [loadingAcceptBooking, setLoadingAcceptBooking] = useState(false);
  const [openConfirmBooking, setOpenConfirmBooking] = useState(false);

  const elements = useElements();
  const stripe = useStripe();
  const [nights, setNights] = useState(0);
  useEffect(() => {
    if (selectedRoomType !== "") {
      setAccomData(
        accoms.find((accom) => accom.accomId === selectedRoomType.accomId)
      );
      setNights(
        parseFloat(
          formatDistance(
            searchDateRange[0].startDate,
            searchDateRange[0].endDate
          ).split(" ")[0]
        )
      );
      setDiscount(
        (
          (parseFloat(selectedRoomType.price.split(" ")[0].replace(/\./g, "")) /
            parseFloat(
              selectedRoomType.originalPrice.split(" ")[0].replace(/\./g, "")
            )) *
          100
        ).toFixed(0)
      );
      setTotalBookingPrice(
        parseFloat(selectedRoomType.price.split(" ")[0].replace(/\./g, "")) *
          nights *
          seacrchNumOfRooms +
          bookingTax -
          bookingDiscount
      );
    }
  }, [selectedRoomType, nights]);

  useEffect(() => {
    const foundRooms = rooms
      .filter((room) => room.roomTypeId === selectedRoomType.roomTypeId)
      .slice(0, seacrchNumOfRooms);
    console.log(foundRooms);
    setRoomsToBook(foundRooms);
  }, [accomData]);

  useEffect(() => {
    setTotalPriceString(totalBookingPrice.toLocaleString("vi-VN"));
  }, [totalBookingPrice]);

  useEffect(() => {
    const handleUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Dữ liệu đặt phòng sẽ mất khi bạn rời khỏi!"; // Thông báo xác nhận tùy chỉnh
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const requestDataVCB = {
    accountNo: 9948184179,
    accountName: "NGUYEN THANH TRUNG",
    acqId: 970436,
    amount: totalBookingPrice,
    addInfo: "DAT PHONG " + accomData.name?.toUpperCase(),
    format: "text",
    template: "compact2",
  };
  const requestDataVTB = {
    accountNo: 9948184179,
    accountName: "NGUYEN THANH TRUNG",
    acqId: 970415,
    amount: totalBookingPrice,
    addInfo: "DAT PHONG " + accomData.name?.toUpperCase(),
    format: "text",
    template: "compact2",
  };
  useEffect(() => {
    fetch("https://api.vietqr.io/v2/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestDataVCB),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu nhận được từ API
        console.log(data);
        setVcbQrImg(data.data.qrDataURL);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
      });
    fetch("https://api.vietqr.io/v2/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestDataVTB),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu nhận được từ API
        console.log(data);
        setVtbQrImg(data.data.qrDataURL);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error);
      });
  }, [requestDataVCB, requestDataVTB]);

  const HandleBookingNameOnChange = (event) => {
    let bookingNameInput = event.target.value.split(" ");
    const formattedBookingName = bookingNameInput.map((input) => {
      const firstChar = input.charAt(0).toUpperCase();
      const restOfString = input.slice(1).toLowerCase();
      return firstChar + restOfString;
    });
    event.target.value = formattedBookingName.join(" ");
  };

  const HandleBookingPhoneOnChange = (event) => {
    const numberPattern = /^[0-9\b]+$/;
    let newValue = event.target.value;
    if (!numberPattern.test(newValue)) {
      newValue = newValue.slice(0, -1);
    }
    if (newValue.length > 11) {
      newValue = newValue.slice(0, 11);
    }
    event.target.value = newValue;
  };

  const steps = [
    {
      title: "Thông tin đặt phòng của bạn",
      leftContent: (
        <>
          <div className="wrapper">
            <div className="wrapper__title">Thông tin đặt phòng</div>
            <div className="infor">
              <img className="infor__image" src={selectedRoomType.image} />
              <div className="infor__content">
                <div className="infor__content__accomodation-name">
                  {accomData.name}
                </div>
                <div className="infor__content__room-name">
                  {selectedRoomType.name}
                </div>
                <div className="infor__content__address">
                  <BsGeoAltFill size={18} />
                  <span>{accomData.address}</span>
                </div>
                <div className="infor__content__tag-rating">
                  <div className="infor__content__tag-rating__tag">
                    <div className="infor__content__tag-rating__tag__item">
                      {accomData.type}
                    </div>
                    <div className="infor__content__tag-rating__tag__item">
                      {accomData.star} <BsStarFill size={12} />
                    </div>
                  </div>
                  <div className="infor__content__tag-rating__rating">
                    <div className="infor__content__tag-rating__rating__score">
                      {accomData.rating}
                    </div>
                    <div className="infor__content__tag-rating__rating__reviews">
                      ({accomData.ratingCount} lượt đánh giá)
                    </div>
                  </div>
                </div>
                <div className="infor__content__facilities">
                  {accomData == true ??
                    accomData.facilities.map((facility, index) => {
                      if (facilitiesList.includes(facility)) {
                        const IconComponent =
                          facilityIcon[facilitiesList.indexOf(facility)];
                        console.log(facilitiesList.indexOf(facility));
                        return (
                          <Facility
                            key={index}
                            content={facility}
                            icon={<IconComponent size={24} />}
                          />
                        );
                      }
                    })}
                </div>
              </div>
            </div>
            <div className="detail-room">
              <div className="detail-room__item">
                <div className="detail-room__item__label">Nhận phòng</div>
                <div className="detail-room__item__input">
                  {`${format(searchDateRange[0].startDate, "eee, dd-MM-yyyy", {
                    locale: vi,
                  })}`}
                </div>
                <div className="detail-room__item__description">Từ 14:00</div>
              </div>
              <hr className="line" />
              <div className="detail-room__item">
                <div className="detail-room__item__label">Trả phòng</div>
                <div className="detail-room__item__input">
                  {`${format(searchDateRange[0].endDate, "eee, dd-MM-yyyy", {
                    locale: vi,
                  })}`}
                </div>
                <div className="detail-room__item__description">
                  Cho đến 12:00
                </div>
              </div>
              <hr className="line" />
              <div className="detail-room__item">
                <div className="detail-room__item__label">ĐÊM</div>
                <div className="detail-room__item__input">
                  {formatDistance(
                    searchDateRange[0].startDate,
                    searchDateRange[0].endDate
                  ).split(" ")[0] + " ĐÊM"}
                </div>
                <div className="detail-room__item__description"></div>
              </div>
              <hr className="line" />
              <div className="detail-room__item">
                <div className="detail-room__item__label">SỐ KHÁCH</div>
                <div className="detail-room__item__input">
                  {seacrchNumOfChild > 0
                    ? `${seacrchNumOfGuest} người lớn - ${seacrchNumOfChild} trẻ em - ${seacrchNumOfRooms} phòng`
                    : `${seacrchNumOfGuest} người lớn - ${seacrchNumOfRooms} phòng`}
                </div>
                <div className="detail-room__item__description"></div>
              </div>
              <hr className="line" />
              <div className="detail-room__item">
                <div className="detail-room__item__label">KIỂU GIƯỜNG</div>
                <div className="detail-room__item__input">
                  {selectedRoomType.bed}
                </div>
                <div className="detail-room__item__description"></div>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="wrapper__title">Thông tin chi tiết của bạn</div>
            <div className="input-column">
              <div className="input">
                <div className="input__label">
                  <span>Họ và tên</span>
                  <div className="input__label__require">*</div>
                </div>
                <input id="bookingName" onChange={HandleBookingNameOnChange} />
                <div className="input__description">
                  Nhập tên như trên CMND/CCCD/Hộ chiếu
                </div>
              </div>
              <div className="input-row">
                <div className="input">
                  <div className="input__label">
                    <span>Địa chỉ Email</span>
                    <div className="input__label__require">*</div>
                  </div>
                  <input id="bookingEmail" />
                  <div className="input__description">
                    Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
                  </div>
                </div>
                <div className="input">
                  <div className="input__label">
                    <span>Số điện thoại</span>
                    <div className="input__label__require">*</div>
                  </div>
                  <input
                    id="bookingPhone"
                    onChange={HandleBookingPhoneOnChange}
                  />
                  <div className="input__description"></div>
                </div>
              </div>
              <Alert
                message={alertMsg}
                type="warning"
                banner
                id="missingInfoAlert"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="policy-before-submit">
            Bằng cách gửi đặt phòng này, tôi thừa nhận là tôi đã đọc và đồng ý
            với <u>Điều khoản & Điều kiện</u> và{" "}
            <u>Chính sách quyền riêng tư</u> của lokastay.
          </div>
        </>
      ),
      rightContent: (
        <div className="wrapper">
          <div className="wrapper__title">Giá chi tiết</div>
          <div className="sale-label">{"Giảm " + discount + "%"}</div>
          <div className="wrapper__row">
            <span>Tên phòng x 1 đêm </span>
            <div className="wrapper__row__price-room">
              <div className="wrapper__row__price-room__old">
                {selectedRoomType.originalPrice + " đ"}
              </div>
              <div className="wrapper__row__price-room__new">
                {selectedRoomType.price}
              </div>
            </div>
          </div>
          <div className="wrapper__row">
            <span>Thuế và phí dịch vụ khách sạn</span>
            <span>99.000 đ</span>
          </div>
          <div className="wrapper__row">
            <span>Ưu đãi</span>
            <span>-99.000 đ</span>
          </div>
          <div className="total-price">
            <div className="total-price__title">Tổng cộng</div>
            <div className="total-price__column">
              <div className="total-price__column__price">
                {totalPriceString + " đ"}
              </div>
              <div className="total-price__column__sub">
                Đã bao gồm thuế và phí
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Thông tin thanh toán",
      leftContent: (
        <div className="wrapper">
          <div className="wrapper__title">Chọn hình thức thanh toán</div>
          <div className="payment-wrapper">
            <div className="payment-wrapper__item">
              <div
                className="payment-wrapper__item__title pointer"
                onClick={() => {
                  setSelected("type 1");
                }}
              >
                Thẻ tín dụng/Thẻ ghi nợ
                {selected === "type 1" ? (
                  <BsRecordCircle size={20} />
                ) : (
                  <BsCircle size={20} />
                )}
              </div>
              {selected === "type 1" && (
                <>
                  <div
                    className="card-element-container"
                    style={{ width: "100%" }}
                  >
                    Thông tin thẻ
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>

                  <Alert
                    message={alertMsg}
                    type="warning"
                    banner
                    id="cardInputWarning"
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>
            <div className="payment-wrapper__item">
              <div
                className="payment-wrapper__item__title pointer"
                onClick={() => {
                  setSelected("type 2");
                }}
              >
                Thanh toán chuyển khoản ngân hàng
                {selected === "type 2" ? (
                  <BsRecordCircle size={20} />
                ) : (
                  <BsCircle size={20} />
                )}
              </div>
              {selected === "type 2" && (
                <div className="bank-wrapper">
                  <div
                    className="bank-wrapper__item pointer"
                    ref={vcbRef}
                    onClick={() => {
                      setBankSelected(1);
                      ScrollVCB();
                    }}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/vi/8/85/Vietcombank_Logo.png" />
                    {bankSelected === 1 ? (
                      <BsRecordCircle size={20} />
                    ) : (
                      <BsCircle size={20} />
                    )}
                  </div>
                  {bankSelected === 1 && (
                    <img src={vcbQrImg} alt="loading..." />
                  )}

                  <div
                    className="bank-wrapper__item pointer"
                    ref={vtbRef}
                    onClick={() => {
                      setBankSelected(2);
                    }}
                  >
                    <img src="https://api.vietqr.io/img/ICB.png" />
                    {bankSelected === 2 ? (
                      <BsRecordCircle size={20} />
                    ) : (
                      <BsCircle size={20} />
                    )}
                  </div>
                  {bankSelected === 2 && (
                    <img src={vtbQrImg} alt="loading..." />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      rightContent: (
        <div className="wrapper">
          <div className="wrapper__title">Thông tin đặt chỗ</div>
          <div className="wrapper__small-row">
            <div className="wrapper__small-row__column">
              <div className="wrapper__small-row__column__name">
                {selectedRoomType.name}
              </div>
              <div className="wrapper__small-row__column__accomodation">
                {accomData.name}
              </div>
            </div>
            <div className="wrapper__small-row__grid">
              <div className="wrapper__small-row__grid__row">
                <div className="wrapper__small-row__grid__row__item top-left">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Nhận phòng
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    {`${format(
                      searchDateRange[0].startDate,
                      "eee, dd-MM-yyyy",
                      {
                        locale: vi,
                      }
                    )}`}
                  </div>
                </div>
                <div className="wrapper__small-row__grid__row__item top-right">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Trả phòng
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    {`${format(searchDateRange[0].endDate, "eee, dd-MM-yyyy", {
                      locale: vi,
                    })}`}
                  </div>
                </div>
              </div>
              <div className="wrapper__small-row__grid__row">
                <div className="wrapper__small-row__grid__row__item bottom-left">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Số phòng
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    {seacrchNumOfRooms}
                  </div>
                </div>
                <div className="wrapper__small-row__grid__row__item bottom-right">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Khách
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    {seacrchNumOfChild > 0
                      ? `${seacrchNumOfGuest} người lớn - ${seacrchNumOfChild} trẻ em`
                      : `${seacrchNumOfGuest} người lớn`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper__small-row">
            <div className="wrapper__small-row__title">Chi tiết giá</div>
            <div className="wrapper__small-row__detail">
              <span>Tên phòng x 1 đêm</span>
              <div className="wrapper__small-row__detail__price-room">
                <div className="wrapper__small-row__detail__price-room__old">
                  {selectedRoomType.originalPrice + " đ"}
                </div>
                <div className="wrapper__small-row__detail__price-room__new">
                  {selectedRoomType.price}
                </div>
              </div>
            </div>
            <div className="wrapper__small-row__detail">
              <span>Thuế và phí dịch vụ khách sạn</span>
              <span>{bookingTax.toLocaleString("vi-VN") + " đ"}</span>
            </div>
            <div className="wrapper__small-row__detail">
              <span>Ưu đãi</span>
              <span>
                {"- " + bookingDiscount.toLocaleString("vi-VN") + " đ"}
              </span>
            </div>
          </div>
          <div className="total-price">
            <div className="total-price__title">Tổng cộng</div>
            <div className="total-price__column">
              <div className="total-price__column__price">
                {totalBookingPrice.toLocaleString("vi-VN") + " đ"}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const next = () => {
    if (IsValidInput()) {
      setBookingName(document.querySelector("#bookingName").value);
      setBookingEmail(document.querySelector("#bookingEmail").value);
      setBookingPhone(document.querySelector("#bookingPhone").value);
      document.querySelector(".ant-alert").style.display = "none";
      setCurrent(current + 1);
      ScrollToTop();
    } else {
      document.querySelector(".ant-alert").style.display = "flex";
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const IsValidInput = () => {
    if (current === 0) {
      setAlertMsg("Vui lòng nhập đầy đủ thông tin");
      if (document.querySelector("#bookingName").value === "") {
        return false;
      }
      if (document.querySelector("#bookingEmail").value === "") {
        return false;
      }
      if (document.querySelector("#bookingPhone").value === "") {
        return false;
      }

      setAlertMsg("Email không hợp lệ");
      const gmailRegex = /@gmail\.com$/i;

      return gmailRegex.test(document.querySelector("#bookingEmail").value);
    }
    // else if (selected === "type 1"){
    //   setAlertMsg('Vui lòng nhập đầy đủ thông tin');
    //   if(document.querySelector('#cardNumber').value === ''){
    //     return false;
    //   }
    //   if(document.querySelector('#cardValidDate').value === ''){
    //     return false;
    //   }
    //   if(document.querySelector('#cardSecret').value === ''){
    //     return false;
    //   }
    //   if(document.querySelector('#cardOwnerName').value === ''){
    //     return false;
    //   }
    // }
    return true;
  };

  const Booking = () => {
    if (IsValidInput()) {
      // setCardNumber(document.querySelector('#cardNumber').value);
      // setCardValidDate(document.querySelector('#cardValidDate').value);
      // setCardSecret(document.querySelector('#cardSecret').value);
      // setCardOwnerName(document.querySelector('#cardOwnerName').value);

      // document.querySelector('.ant-alert').style.display = 'none';

      OpenConfirmBooking();
    } else {
      // document.querySelector('.ant-alert').style.display = 'flex';
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const OpenConfirmBooking = () => {
    setOpenConfirmBooking(true);
  };

  const HandleOk = async () => {
    setLoadingAcceptBooking(true);
    setTimeout(() => {
      setLoadingAcceptBooking(false);
      setOpenConfirmBooking(false);
    }, 1000);

    const stripeItent = require("stripe")(
      "sk_test_51MwSGfItrzk46JwuS9zUmW3MgdDEbZHzUxftRVUBOoW1G4AsT4Im2CWy5UnRCEHDV5jw7wXTOwJHDZCOuqP3cOEA00uu4Jm4V9"
    );

    const { client_secret } = await stripeItent.paymentIntents.create({
      amount: totalBookingPrice,
      currency: "vnd",
      payment_method_types: ["card"],
      metadata: {
        order_id: "6735",
      },
    });

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);

      setTimeout(() => {
        setAlertMsg(result.error.message);
        document.querySelector(".ant-alert").style.display = "flex";
      }, 1000);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        document.querySelector(".ant-alert").style.display = "none";

        //Thêm hóa đơn đặt phòng lên database
        await addDoc(collection(db, "orders"), {
          uid: user.uid,
          accomId: accomData.accomId,
          roomTypeId: selectedRoomType.roomTypeId,
          orderDate: serverTimestamp(),
          recvDate: searchDateRange[0].startDate,
          endDate: searchDateRange[0].endDate,
          nights: nights,
          orderPrice: totalBookingPrice,
          oneRoomPrice: selectedRoomType.price,
          roomTypeName: selectedRoomType.name,
          guest: seacrchNumOfGuest,
          children: seacrchNumOfChild,
          numOfRooms: seacrchNumOfRooms,
          canceled: false,
          customerName: bookingName,
          customerMail: bookingEmail,
          customerPhone: bookingPhone,
          orderOriginalPrice: selectedRoomType.originalPrice,
        }).then((result) => {
          setOrderId(result.id);
          roomsToBook.map((room) => {
            addDoc(collection(db, "booking"), {
              uid: user.uid,
              accomId: accomData.accomId,
              roomTypeId: selectedRoomType.roomTypeId,
              orderDate: serverTimestamp(),
              recvDate: searchDateRange[0].startDate,
              endDate: searchDateRange[0].endDate,
              orderId: result.id,
              roomId: room.roomId,
              roomNumber: room.roomNumber,
            });
          });
        });
        setBookingSuccess(true);
        navigate("/booking/result");
      }
    }
  };

  const handleCancel = () => {
    setOpenConfirmBooking(false);
  };

  return (
    <Helmet title="Đặt phòng">
      <div className="booking" ref={goTopRef}>
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/result">Tìm kiếm</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/detail">Chi tiết</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Steps current={current} items={items} className="steps" />
        <div className="booking__content">
          <div className="booking__content__left">
            {steps[current].leftContent}

            {current < steps.length - 1 && (
              <Button className="cyan fill" onClick={() => next()}>
                Tiếp tục
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button className="cyan fill" onClick={Booking}>
                Hoàn tất đặt phòng
              </Button>
            )}
            {current > 0 && (
              <Button className="outline fill" onClick={() => prev()}>
                Trở về
              </Button>
            )}
          </div>
          <Modal
            open={openConfirmBooking}
            title="Xác nhận đặt phòng"
            icon={<BiSolidInfoCircle />}
            onOk={HandleOk}
            onCancel={handleCancel}
            footer={[
              <AntButton key="back" onClick={handleCancel}>
                Trở về
              </AntButton>,
              <AntButton
                key="submit"
                type="primary"
                loading={loadingAcceptBooking}
                onClick={HandleOk}
              >
                Xác nhận
              </AntButton>,
            ]}
          >
            <p style={{ fontSize: "20px" }}>Bạn có xác nhận muốn đặt phòng?</p>
          </Modal>
          <div className="booking__content__right">
            {steps[current].rightContent}
          </div>
        </div>
      </div>
    </Helmet>
  );
};
