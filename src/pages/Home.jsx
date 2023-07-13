import React, { useContext } from "react";
import Button from "../components/common/Button";
import SearchBar from "../components/common/Home/SearchBar";
import DestinationItem from "../components/common/Home/DestinationItem";
import { BsArrowRight } from "react-icons/bs";
import Logo from "../components/common/Logo";
import RecommendedStay from "../components/common/Home/RecommendedStay";
import AdvantageItem from "../components/common/Home/AdvantageItem";
import image1 from "../../src/assets/images/advantage-01.png";
import image2 from "../../src/assets/images/advantage-02.png";
import image3 from "../../src/assets/images/advantage-03.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppProvider";
import { notification } from "antd";

export const Home = () => {
  const dataProvided = useContext(AppContext);
  const {setSortOpitons} = dataProvided;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification(
    {maxCount : '3'}
  );

  const ViewMore = (opt) => {
    let optToSort = ''
    if(opt == 'popular'){
      optToSort = 'mostPopular';
    }
    else if (opt == 'highRating'){
      optToSort = 'highestRating';
    }
    else{
      return;
    }
    setSortOpitons((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.name === optToSort) {
          return { ...option, selected: true };
        } else {
          return { ...option, selected: false };
        }
      });
    });
    window.scrollTo(0, 0);
    navigate('/results')
  };

  const openNotification = (placement) => {
    api.success({
      message: 'Thông báo',
      description: 'Đăng ký nhận thông tin thành công!',
      placement,
    });
  };

  return (
    <div className="home">
      <div className="home__top-banner">
        <SearchBar />
      </div>
      <div className="home__section">
        <div className="home__section__header">
          <div className="home__section__header__title">
            <span>Điểm đến hàng đầu</span> dành cho bạn
          </div>
          <Button
            className="no-background"
            postIcon={() => <BsArrowRight size={20}/>}
            onClick={() => {ViewMore('popular')}}
          >
            Nhiều hơn
          </Button>
        </div>
        <div className="four-cols">
          <DestinationItem title="Ninh Bình" number="900" />
          <DestinationItem title="Ninh Bình" number="900" />
          <DestinationItem title="Ninh Bình" number="900" />
          <DestinationItem title="Ninh Bình" number="900" />
        </div>
      </div>
      <div className="home__banner background1">
        <div className="home__banner__title">
          Tham gia và trải nghiệm những chuyến đi cùng
        </div>
        <div className="home__banner__logo">
          <Logo />
        </div>
        <Button className="cyan shadow" onClick={() => {navigate('/register');}}>Đăng ký ngay!</Button>
      </div>
      <div className="home__section">
        <div className="home__section__header">
          <div className="home__section__header__title">
            <span>Chỗ nghỉ</span> được đánh giá cao
          </div>
          <Link to="/results">
            <Button
              className="no-background"
              postIcon={() => <BsArrowRight size={20} />}
              onClick={() => {ViewMore('highRating')}}
            >
              Nhiều hơn
            </Button>
          </Link>
          
        </div>
        <div className="four-cols wrap">
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="10.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="10.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="10.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="10.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="9.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="9.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="10.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
          <RecommendedStay
            name="Tên chỗ nghỉ"
            adrress="Địa chỉ Phường, TP"
            rating="9.0"
            reviews="(120 đánh giá)"
            price="9.999.999 đ"
          />
        </div>
      </div>
      <div className="home__banner">
        <div className="home__banner__title">
          Tại sao nên lựa chọn Lokastay?
        </div>
        <div className="home__banner__content">
          <AdvantageItem
            image={image1}
            title="Nhiều sự lựa chọn"
            description=" Nhiều địa điểm hấp dẫn để bạn lựa chọn sao cho phù hợp với mục tiêu của
     mình."
          />
          <AdvantageItem
            image={image3}
            title="Nhiều ưu đãi và tiết kiệm"
            description="Đăng ký để trở thành thành viên của lokastay, bạn sẽ có cơ hội nhận được nhiều ưu đãi tiết kiệm!"
          />
          <AdvantageItem
            image={image2}
            title="Đặt phòng một cách dễ dàng"
            description="Lựa chọn đích đến thích hợp và tiến hành đặt phòng vô cùng nhanh chóng và tiện lợi!"
          />
        </div>
      </div>
      <div className="home__banner background2">
        <div className="home__banner__title">
          Đăng ký để được nhận các thông tin ưu đãi từ chúng tôi
        </div>
        <div className="home__banner__content subcribe">
          <input className="input" placeholder="Nhập địa chỉ email của bạn" />
          {contextHolder}
          <Button className="button"
          onClick={() => openNotification('bottomRight')}>
            Đăng ký
            </Button>
        </div>
      </div>
    </div>
  );
};
