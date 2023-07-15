import React, { useEffect, useRef, useState } from "react";
import Back from "../components/common/Back";
import Facility from "../components/common/Facility";
import Button from "../components/common/Button";
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
  BsXLg,
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
} from "react-icons/md";
import SearchBar from "../components/common/Home/SearchBar";
import AvailableRoom from "../components/common/Detail/AvailableRoom";
import RecommendedStay from "../components/common/Home/RecommendedStay";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const Detail = (props) => {
  const navigate = useNavigate();
  const dataProvided = useContext(AppContext);
  const { user, roomTypes, setRoomTypes, accoms } = dataProvided;
  const { accomData } = props;
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
  let indexRoomTypeImage = 0;
  const goBookRoomRef = useRef(null);
  const [marker, setMarker] = useState({});

  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const accomId = parts[parts.length - 1];
  const ScrollToBookRoom = () => {
    goBookRoomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  let loved = false;
  try {
    loved = user
      ? user.lovedRoomsId.includes(accomData.accomId)
        ? true
        : false
      : false;
  } catch {
    loved = false;
  }
  const [anotherAccoms, setAnotherAccoms] = useState([]);
  useEffect(() => {
    let randomItems = [];
    while (randomItems.length < 3) {
      const randomIndex = Math.floor(Math.random() * accoms.length);
      const randomItem = accoms[randomIndex];

      if (!randomItems.some((item) => item.accomId === randomItem.accomId)) {
        randomItems.push(randomItem);
      }
    }
    setAnotherAccoms(randomItems);
  }, [accoms]);

  useEffect(() => {
    console.log(anotherAccoms);
  }, [anotherAccoms]);

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${accomData.address}.json?access_token=pk.eyJ1IjoiMTYwM25nb2N0cmluaCIsImEiOiJjbGszYWIzdHQwbGV6M25sc3JlMXl2N2I5In0.SWaxHyfB8VPYvvwCd2YF8w`
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setMarker({
          longitude: res.features[0].center[0],
          latitude: res.features[0].center[1],
        });
      });
  }, []);

  return (
    <div className="detail">
      <Back />
      <div className="image-list">
        <img className="image-list__main-image" src={accomData.images[0]} />
        <div className="image-list__column">
          <img className="image-list__column__item" src={accomData.images[1]} />
          <img className="image-list__column__item" src={accomData.images[2]} />
        </div>
        <div className="image-list__column">
          <img
            className="image-list__column__item top"
            src={accomData.images[3]}
          />
          <div className="image-list__column__item bottom">
            <img src={accomData.images[4]} />
            {accomData.images.length - 4 > 0 ?? (
              <>
                <div className="blur">
                  <div className="number">
                    +5
                    <BsImages size={24} />
                  </div>
                </div>
                <Button className="view-all">Xem tất cả hình ảnh</Button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="content">
        <div className="overview">
          <div className="infor">
            <div className="infor__title">
              <div className="infor__title__content">
                <div className="infor__title__content__name">
                  {accomData.name}
                </div>
                <div className="infor__title__content__type">
                  {accomData.type}
                </div>
                <div className="infor__title__content__stars">
                  {Array.from({ length: accomData.star }, (_, index) => (
                    <BsStarFill key={index} size={28} />
                  ))}
                </div>
              </div>
              <div className="infor__title__heart">
                {loved ? (
                  <BsHeartFill size={36} color="red" />
                ) : (
                  <BsHeart size={36} />
                )}
              </div>
            </div>
            <div className="infor__address">
              <BsGeoAltFill size={24} />
              <div className="infor__address__content">{accomData.address}</div>
            </div>
            <hr className="line" />
            <div className="section">
              <div className="section__title">Tổng quan</div>
              <div className="section__content">
                <div className="description">{accomData.summary}</div>
                <div className="more">Xem thêm</div>
              </div>
              <hr className="line" />
            </div>
            <div className="section">
              <div className="section__title">Tiện nghi</div>
              <div className="section__content" id="facilities">
                {accomData.facilities.map((facility, index) => {
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
                <Facility
                  content="Dịch vụ phòng"
                  icon={<MdOutlineRoomService size={24} />}
                />
              </div>
              <hr className="line" />
            </div>
          </div>

          <div className="side">
            <div className="rating-price">
              <div className="rating-price__rating">
                <div className="rating-price__rating__number">10.0</div>
                <div className="rating-price__rating__number-2">
                  (<u>{accomData.ratingCount + " đánh giá"}</u>)
                </div>
              </div>
              <div className="rating-price__price">
                {accomData.price + " đ"}
              </div>
            </div>
            <Button onClick={ScrollToBookRoom} className="fill cyan">
              Chọn phòng
            </Button>
            <div className="line" style={{ margin: "32px 0" }} />
            <Popup
              trigger={
                <div className="map">
                  <BsGeoAltFill size={48} />
                  <div className="map__item">Mở bản đồ</div>
                </div>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal row" style={{ position: "relative" }}>
                  <div id="map">
                    <Map
                      mapboxAccessToken="pk.eyJ1IjoiMTYwM25nb2N0cmluaCIsImEiOiJjbGszYWIzdHQwbGV6M25sc3JlMXl2N2I5In0.SWaxHyfB8VPYvvwCd2YF8w"
                      initialViewState={{
                        longitude: marker.longitude,
                        latitude: marker.latitude,
                        zoom: 15,
                      }}
                      mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                      <Marker
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        offsetLeft={-20}
                        offsetRight={-30}
                      >
                        <BsGeoAltFill size={40} />
                      </Marker>
                    </Map>
                  </div>
                  <Button
                    preIcon={() => <BsXLg size={20} />}
                    className="grey"
                    onClick={() => {
                      close();
                    }}
                  >
                    Đóng
                  </Button>
                </div>
              )}
            </Popup>

            <div className="places">
              <div className="places__title">Các địa danh phổ biến</div>
              <div className="places__item">
                <span className="places__item__left">
                  Sân bay Quốc tế Phú Quốc
                </span>
                <span className="places__item__right">33,5 km</span>
              </div>
              <div className="places__item">
                <span className="places__item__left">Vinwonders Phú Quốc</span>
                <span className="places__item__right">4,2 km</span>
              </div>
              <div className="places__item">
                <span className="places__item__left">Grand World Phú Quốc</span>
                <span className="places__item__right">2,9 km</span>
              </div>
              <div className="places__item">
                <span className="places__item__left">
                  Vinpearl Golf Phú Quốc
                </span>
                <span className="places__item__right">4,7 km</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div ref={goBookRoomRef} className="section__title">
            Phòng còn trống
          </div>
          <div className="section__content" id="rooms">
            <SearchBar type="detail" />
            <div className="four-cols wrap">
              {roomTypes.map((roomType) => {
                if (roomType.accomId === accomId) {
                  indexRoomTypeImage++;
                  return (
                    <AvailableRoom
                      key={indexRoomTypeImage}
                      roomData={roomType}
                      image={accomData.images[indexRoomTypeImage]}
                    />
                  );
                }
              })}
            </div>
          </div>
          <hr className="line" />
        </div>

        <div className="section">
          <div className="section__title">So sánh với các gợi ý khác</div>
          <div className="section__content" id="compare">
            <div className="col-1">
              <hr className="line" />
              <div className="col-1__item">Giá mỗi đêm từ</div>
              <hr className="line" />
              <div className="col-1__item">Tiện ích</div>
              <hr className="line" />
              <div className="col-1__item">Đánh giá của khách hàng</div>
              <hr className="line" />
            </div>
            {anotherAccoms.map((accom) => {
              return (
                <div className="col-2">
                  <div className="image margin">
                    <img src={accom.images[0]} style={{ maxHeight: "200px" }} />
                    <div className="tag">
                      <span>{accom.type}</span>
                      <span>
                        {accom.star} <BsStarFill size={12} />
                      </span>
                    </div>
                    <div className="heart">
                      <BsHeartFill size={28} color="rgba(39, 43, 78, 0.32)" />
                      <BsHeart size={28} />
                    </div>
                  </div>
                  <div className="title margin" style={{ minHeight: "48px" }}>
                    {accom.name}
                  </div>
                  <hr className="line" />
                  <div className="price-infor margin">
                    <div className="price-infor__percent-sale">60%</div>
                    <div className="price-infor__price">
                      <div className="price-infor__price__old">
                        {accom.originalPrice + " đ"}
                      </div>
                      <div className="price-infor__price__new">
                        {accom.price + " đ"}
                      </div>
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="facilities margin">
                    <div className="facilities__item">
                      <MdPool size={24} />
                      Hồ bơi ngoài trời
                    </div>
                    <div className="facilities__item">
                      <MdOutlineBeachAccess size={24} />
                      Đưa đón sân bay
                    </div>
                    <div className="facilities__item">
                      <MdTimeToLeave size={24} />
                      Phòng không hút thuốc
                    </div>
                    <div className="facilities__item">
                      <MdSmokeFree size={24} />
                      Giáp biển
                    </div>
                    <div className="facilities__more">
                      (Nhiều tiện nghi khác)
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="rating margin">
                    <div className="rating__score">{accom.rating}</div>
                    <div className="rating__reviews">
                      {accom.ratingCount + " lượt đánh giá"}
                    </div>
                  </div>
                  <hr className="line" />
                  <div className="button-wrapper">
                    <Button
                      className="cyan glow"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate("/detail/" + accom.accomId);
                      }}
                    >
                      Chọn phòng
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="line" />
        </div>

        <div className="section">
          <div className="section__title">Đánh giá</div>
          <div className="section__content" id="rating">
            <div className="score">
              <div className="total-score">{accomData.rating}</div>
              <div className="total-reviews">
                <b>{accomData.ratingCount}</b> đánh giá
              </div>
            </div>
            <hr className="line" style={{ margin: "40px 0px" }} />
            <div className="filter">
              <div className="filter__item">
                Tất cả loại phòng <BsChevronDown size={16} />
              </div>
              <div className="filter__item">Đánh giá trên 9,0</div>
              <div className="filter__item">Đánh giá trên 8,0</div>
              <div className="filter__item">Đánh giá trên 7,0</div>
              <div className="filter__item">Đánh giá trên 6,0</div>
              <div className="filter__item">Đánh giá dưới 5,0</div>
              <div className="dropdown">
                <div className="dropdown__item"></div>
              </div>
            </div>
            {[...Array(3)].map((reviews, index) => {
              return (
                <div className="wrapper" key={index}>
                  <div className="row">
                    <div className="row__title">
                      Rất yên tĩnh và phong cảnh đẹp
                    </div>
                    <div className="row__score">9,3</div>
                  </div>
                  <div className="row not-margin">
                    <div className="row__content">
                      Thích nhất là cây cối xung quanh khách sạn, yên tĩnh và
                      biển rất trong xanh. Tuy nhiên vẫn xa trung tâm, đối với
                      những ai yêu thích thiên nhiên và cần sự yên tĩnh, thoải
                      mái thì nên đến đây nghỉ ngơi! Khách sạn sạch sẽ, nhân
                      viên từ lễ tân đến các chị dọn phòng rất dễ thương. Ông
                      chủ khách sạn cũng rất là nhiệt tình. Nếu sang Phú Quốc
                      lần nữa, chắc chắn sẽ đến Mai Phương lần nữa.
                    </div>
                    <div className="row__date">25/03/2023</div>
                  </div>
                  <div className="user">Thị</div>
                  <div className="infor-reserve">
                    Loại phòng: Phòng 2 giường đơn nhìn ra vườn | Đã ở 3 đêm vào
                    tháng 3 năm 2023
                  </div>
                </div>
              );
            })}
            <div className="page"></div>
            <hr className="line" />
          </div>
        </div>

        <div className="section">
          <div className="section__title">Quy định và chính sách</div>
          <div className="section__content" id="policies">
            <div className="policy-item">
              <div className="policy-item__title">
                <BsBoxArrowInRight size={24} />
                Giờ nhận phòng:
              </div>
              <div className="policy-item__infor">Từ 14:00</div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <BsBoxArrowInLeft size={24} />
                Giờ trả phòng:
              </div>
              <div className="policy-item__infor">Trước 12:00</div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <BsJournalText size={24} />
                Quy định nhận phòng:
              </div>
              <div className="policy-item__infor">
                Khách được yêu cầu xuất trình giấy tờ tùy thân có ảnh và thẻ tín
                dụng lúc nhận phòng
              </div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <MdChildCare size={24} />
                Chính sách trẻ em:
              </div>
              <div className="policy-item__infor">
                Phù hợp cho tất cả trẻ em. Trẻ em từ 7 tuổi trở lên được tính
                như người lớn tại chỗ nghỉ này. Để xem thông tin giá và tình
                trạng phòng trống chính xác, vui lòng thêm số lượng và độ tuổi
                của trẻ em trong nhóm của bạn khi tìm kiếm.
              </div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <MdOutlineBedroomChild size={24} />
                Chính sách nôi (cũi) và giường:
              </div>
              <div className="policy-item__infor">
                Chỗ nghỉ này không có nôi/cũi và giường phụ.
              </div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <MdAttribution size={24} />
                Giới hạn độ tuổi:
              </div>
              <div className="policy-item__infor">
                Không có yêu cầu về độ tuổi khi nhận phòng.
              </div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <MdPets size={24} />
                Thú cưng:
              </div>
              <div className="policy-item__infor">
                Vật nuôi không được phép.
              </div>
            </div>
            <hr className="line" />
            <div className="policy-item">
              <div className="policy-item__title">
                <BsCreditCard size={24} />
                Thẻ được chấp nhận tại đây:
              </div>
              <div className="policy-item__infor">Bankcard.</div>
            </div>
            <hr className="line" />
          </div>
        </div>
      </div>
      <div className="accommodation-around">
        <div className="accommodation-around__header">
          Khách sạn <span> xung quanh</span>
        </div>
        <div className="accommodation-around__content four-cols">
          {accoms.slice(0, 4).map((accom) => {
            return (
              <RecommendedStay
                name={accom.name}
                adrress={accom.address}
                rating={accom.rating}
                reviews={"(" + accom.ratingCount + " lượt đánh giá)"}
                price={accom.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
