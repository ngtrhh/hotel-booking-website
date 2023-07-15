import React, { useContext, useState, useEffect } from "react";
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
import _ from "lodash";
import Helmet from "../components/common/Helmet";

export const Home = () => {
  const dataProvided = useContext(AppContext);
  const { setSortOpitons, accoms, provinces, setProvinces } = dataProvided;
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification({ maxCount: "3" });
  const [randomAccoms, setRandomAccoms] = useState([]);
  const [randomProvinces, setRandomProvinces] = useState([]);

  useEffect(() => {
    // Shuffle the accoms array
    const shuffledAccoms = _.shuffle(accoms);

    // Get the first 8 unique values from the shuffled array
    const selectedAccoms = shuffledAccoms.slice(0, 8);

    setRandomAccoms(selectedAccoms);
  }, [accoms]);

  useEffect(() => {
    // Shuffle the accoms array
    console.log(provinces);
    const shuffledProvinces = _.shuffle(provinces);

    // Get the first 8 unique values from the shuffled array
    const selectedProvinces = shuffledProvinces.slice(0, 4);

    setRandomProvinces(selectedProvinces);
  }, [provinces]);

  const ViewMore = (opt) => {
    let optToSort = "";
    if (opt == "popular") {
      optToSort = "mostPopular";
    } else if (opt == "highRating") {
      optToSort = "highestRating";
    } else {
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
    navigate("/results");
  };

  const openNotification = (placement) => {
    api.success({
      message: "Thông báo",
      description: "Đăng ký nhận thông tin thành công!",
      placement,
    });
  };

  return (
    <Helmet>
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
              postIcon={() => <BsArrowRight size={20} />}
              onClick={() => {
                ViewMore("popular");
              }}
            >
              Nhiều hơn
            </Button>
          </div>
          <div className="four-cols">
            {randomProvinces.map((province) => {
              return (
                <DestinationItem
                  title={province.name}
                  number={province.accomsCount}
                  imageURL={province.imageURL}
                />
              );
            })}
          </div>
        </div>
        <div className="home__banner background1">
          <div className="home__banner__title">
            Tham gia và trải nghiệm những chuyến đi cùng
          </div>
          <div className="home__banner__logo">
            <Logo />
          </div>
          <Button
            className="cyan shadow"
            onClick={() => {
              navigate("/register");
            }}
          >
            Đăng ký ngay!
          </Button>
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
                onClick={() => {
                  ViewMore("highRating");
                }}
              >
                Nhiều hơn
              </Button>
            </Link>
          </div>
          <div className="four-cols wrap">
            {randomAccoms.slice(0, 8).map((accom, index) => {
              return (
                <RecommendedStay
                  name={accom.name}
                  adrress={accom.address}
                  rating={accom.rating}
                  reviews={"(" + accom.ratingCount + " lượt đánh giá)"}
                  price={accom.price}
                  image={accom.images[0]}
                />
              );
            })}
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
            <Button
              className="button"
              onClick={() => openNotification("bottomRight")}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
