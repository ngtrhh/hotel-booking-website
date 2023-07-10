import React, { useEffect, useState } from "react";
import { Breadcrumb, message, Steps } from "antd";
import { format, addDays, differenceInDays } from "date-fns";
import vi from "date-fns/locale/vi";
import image from "../assets/images/ImageBanner.png";
import Facility from "../components/common/Facility";
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
  BsRecordCircle
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
  MdZoomOutMap
} from "react-icons/md";  
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";

export const Booking = (props) => {
  const navigate = useNavigate();
  const dataProvided = useContext(AppContext);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("type 1");
  const [bankSelected, setBankSelected] = useState(1);
  const facilitiesList = ['Hồ bơi', 'Chỗ đậu xe', 'Quầy bar',
  'Wifi', 'Phòng gym', 'Trung tâm thể dục', 'Thích hợp cho gia đình/trẻ em',
  'Bữa sáng miễn phí'];
  const facilityIcon = [MdPool, MdTimeToLeave, MdLocalBar,
    MdWifi, MdSportsGymnastics, MdSportsFootball, MdChildCare,
    MdFastfood];

  const {accoms, accomData, setAccomData, 
          selectedRoomType, setSelectedRoomType,
          searchDateRange
        } = dataProvided;
  useEffect(() => {
    if(selectedRoomType !== ''){
      setAccomData(accoms.find(accom => accom.accomId === selectedRoomType.accomId));
    }
  }, [selectedRoomType]);

  useEffect(() => {
    const handleUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Dữ liệu đặt phòng sẽ mất khi bạn rời khỏi!'; // Thông báo xác nhận tùy chỉnh
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);


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
                <div className="infor__content__room-name">{selectedRoomType.name}</div>
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
                  {(accomData==true) ?? accomData.facilities.map((facility, index) => {
                    if(facilitiesList.includes(facility)){
                      const IconComponent = facilityIcon[facilitiesList.indexOf(facility)];
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
                <div className="detail-room__item__input">1</div>
                <div className="detail-room__item__description"></div>
              </div>
              <hr className="line" />
              <div className="detail-room__item">
                <div className="detail-room__item__label">SỐ KHÁCH</div>
                <div className="detail-room__item__input">2</div>
                <div className="detail-room__item__description"></div>
              </div>
              <hr className="line" />
              <div className="detail-room__item">
                <div className="detail-room__item__label">kIỂU GIƯỜNG</div>
                <div className="detail-room__item__input">GIƯỜNG ĐÔI</div>
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
                <input />
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
                  <input />
                  <div className="input__description">
                    Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
                  </div>
                </div>
                <div className="input">
                  <div className="input__label">
                    <span>Số điện thoại</span>
                    <div className="input__label__require">*</div>
                  </div>
                  <input />
                  <div className="input__description"></div>
                </div>
              </div>
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
          <div className="sale-label">Giảm 40%</div>
          <div className="wrapper__row">
            <span>Tên phòng x 1 đêm </span>
            <div className="wrapper__row__price-room">
              <div className="wrapper__row__price-room__old">1.100.0000 đ</div>
              <div className="wrapper__row__price-room">840.000 đ</div>
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
              <div className="total-price__column__price">840.000 đ</div>
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
                <div className="input-column">
                  <div className="input">
                    <div className="input__label">
                      <span>Số thẻ tín dụng</span>
                      <div className="input__label__require">*</div>
                    </div>
                    <input />
                  </div>
                  <div className="input-row">
                    <div className="input">
                      <div className="input__label">
                        <span>Hợp lệ đến</span>
                        <div className="input__label__require">*</div>
                      </div>
                      <input placeholder="MM/YY" />
                    </div>
                    <div className="input">
                      <div className="input__label">
                        <span>CVV/CVN</span>
                        <div className="input__label__require">*</div>
                      </div>
                      <input placeholder="Mã 3-4 chữ số" />
                      <div className="input__description"></div>
                    </div>
                  </div>
                  <div className="input">
                    <div className="input__label">
                      <span>Tên trên thẻ</span>
                      <div className="input__label__require">*</div>
                    </div>
                    <input placeholder="Tên ghi trên thẻ" />
                  </div>
                </div>
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
                    onClick={() => {
                      setBankSelected(1);
                    }}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/vi/8/85/Vietcombank_Logo.png" />
                    {bankSelected === 1 ? (
                      <BsRecordCircle size={20} />
                    ) : (
                      <BsCircle size={20} />
                    )}
                  </div>
                  <div
                    className="bank-wrapper__item pointer"
                    onClick={() => {
                      setBankSelected(2);
                    }}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/vi/3/3d/Argibank_logo.svg" />
                    {bankSelected === 2 ? (
                      <BsRecordCircle size={20} />
                    ) : (
                      <BsCircle size={20} />
                    )}
                  </div>
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
              <div className="wrapper__small-row__column__name">Tên phòng</div>
              <div className="wrapper__small-row__column__accomodation">
                Tên khách sạn
              </div>
            </div>
            <div className="wrapper__small-row__grid">
              <div className="wrapper__small-row__grid__row">
                <div className="wrapper__small-row__grid__row__item top-left">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Nhận phòng
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    T7, 8 tháng 4
                  </div>
                </div>
                <div className="wrapper__small-row__grid__row__item top-right">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Trả phòng
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    CN, 9 tháng 4
                  </div>
                </div>
              </div>
              <div className="wrapper__small-row__grid__row">
                <div className="wrapper__small-row__grid__row__item bottom-left">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Nhận phòng
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    1
                  </div>
                </div>
                <div className="wrapper__small-row__grid__row__item bottom-right">
                  <div className="wrapper__small-row__grid__row__item__label">
                    Khách
                  </div>
                  <div className="wrapper__small-row__grid__row__item__content">
                    2
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
                  1.100.0000 đ
                </div>
                <div className="wrapper__small-row__detail__price-room__new">
                  840.000 đ
                </div>
              </div>
            </div>
            <div className="wrapper__small-row__detail">
              <span>Thuế và phí dịch vụ khách sạn</span>
              <span>99.000 đ</span>
            </div>
            <div className="wrapper__small-row__detail">
              <span>Ưu đãi</span>
              <span>-99.000 đ</span>
            </div>
          </div>
          <div className="total-price">
            <div className="total-price__title">Tổng cộng</div>
            <div className="total-price__column">
              <div className="total-price__column__price">840.000 đ</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <div className="booking">
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
            <Button
              className="cyan fill"
              onClick={() => message.success("Bạn đã đặt phòng thành công!")}
            >
              Hoàn tất đặt phòng
            </Button>
          )}
          {current > 0 && (
            <Button className="outline fill" onClick={() => prev()}>
              Trở về
            </Button>
          )}
        </div>

        <div className="booking__content__right">
          {steps[current].rightContent}
        </div>
      </div>
    </div>
  );
};
