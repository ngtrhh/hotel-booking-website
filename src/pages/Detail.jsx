import React, { useRef } from "react";
import Back from "../components/common/Back";
import image from "../assets/images/ImageBanner.png";
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
} from "react-icons/md";
import SearchBar from "../components/common/Home/SearchBar";
import AvailableRoom from "../components/common/Detail/AvailableRoom";
import RecommendedStay from "../components/common/Home/RecommendedStay";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";

export const Detail = (props) => {
  const ref = useRef(null);
  const dataProvided = useContext(AppContext);
  const {accomData} = props;

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
          <img className="image-list__column__item top" src={accomData.images[3]} />
          <div className="image-list__column__item bottom">
            <img src={accomData.images[4]} />
            {
              (accomData.images.length - 4 > 0) ?? 
              (
                <>
                  <div className="blur">
                    <div className="number">
                      +5
                      <BsImages size={24} />
                    </div>
                  </div>
                  <Button className="view-all">Xem tất cả hình ảnh</Button>
                </>
              )
            }
            
            
          </div>
        </div>
      </div>
      <div className="content">
        <div className="overview">
          <div className="infor">
            <div className="infor__title">
              <div className="infor__title__content">
                <div className="infor__title__content__name">{accomData.name}</div>
                <div className="infor__title__content__type">{accomData.type}</div>
                <div className="infor__title__content__stars">
                  <BsStarFill size={28} />
                  <BsStarFill size={28} />
                  <BsStarFill size={28} />
                  <BsStarFill size={28} />
                </div>
              </div>
              <div className="infor__title__heart">
                <BsHeart size={36} />
              </div>
            </div>
            <div className="infor__address">
              <BsGeoAltFill size={24} />
              <div className="infor__address__content">
                Bãi Dài, Cửa Cạn, Phú Quốc, Việt Nam
              </div>
            </div>
            <hr className="line" />
            <div className="section">
              <div className="section__title">Tổng quan</div>
              <div className="section__content">
                <div className="description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="more">Xem thêm</div>
              </div>
              <hr className="line" />
            </div>
            <div className="section">
              <div className="section__title">Tiện nghi</div>
              <div className="section__content" id="facilities">
                <Facility
                  content="Hồ bơi ngoài trời"
                  icon={<MdPool size={24} />}
                />
                <Facility
                  content="Xe đưa đón sân bay"
                  icon={<MdTimeToLeave size={24} />}
                />
                <Facility
                  content="Phòng không hút thuốc"
                  icon={<MdSmokeFree size={24} />}
                />

                <Facility
                  content="Giáp biển"
                  icon={<MdOutlineBeachAccess size={24} />}
                />
                <Facility content="Wifi miễn phí" icon={<MdWifi size={24} />} />
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
                  (<u>231 đánh giá</u>)
                </div>
              </div>
              <div className="rating-price__price">844.000 đ</div>
            </div>
            <Button className="fill cyan">Chọn phòng</Button>
            <div className="line" style={{ margin: "32px 0" }} />
            <div className="map">
              <BsGeoAltFill size={48} />
              <div className="map__item">Mở bản đồ</div>
            </div>

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
          <div className="section__title">Phòng còn trống</div>
          <div className="section__content" id="rooms">
            <SearchBar type="detail" />
            <div className="four-cols wrap">
              <AvailableRoom />
              <AvailableRoom />
              <AvailableRoom />
              <AvailableRoom />
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
            <div className="col-2">
              <div className="image margin">
                <img src={require("../assets/images/ImageBanner.png")} />
                <div className="tag">
                  <span>Resort</span>
                  <span>
                    4 <BsStarFill size={12} />
                  </span>
                </div>
                <div className="heart">
                  <BsHeartFill size={28} color="rgba(39, 43, 78, 0.32)" />
                  <BsHeart size={28} />
                </div>
              </div>
              <div className="title margin">Tên chỗ nghỉ</div>
              <hr className="line" />
              <div className="price-infor margin">
                <div className="price-infor__percent-sale">60%</div>
                <div className="price-infor__price">
                  <div className="price-infor__price__old">1.110.000 đ</div>
                  <div className="price-infor__price__new">844.000 đ</div>
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
                <div className="facilities__more">(Nhiều tiện nghi khác)</div>
              </div>
              <hr className="line" />
              <div className="rating margin">
                <div className="rating__score">8,4</div>
                <div className="rating__reviews">231 lượt đánh giá</div>
              </div>
              <hr className="line" />
              <div className="button-wrapper">
                <Button className="cyan glow">Chọn phòng</Button>
              </div>
            </div>
            <div className="col-2">
              <div className="image margin">
                <img src={require("../assets/images/ImageBanner.png")} />
                <div className="tag">
                  <span>Resort</span>
                  <span>
                    4 <BsStarFill size={12} />
                  </span>
                </div>
                <div className="heart">
                  <BsHeartFill size={28} color="rgba(39, 43, 78, 0.32)" />
                  <BsHeart size={28} />
                </div>
              </div>
              <div className="title margin">Tên chỗ nghỉ</div>
              <hr className="line" />
              <div className="price-infor margin">
                <div className="price-infor__percent-sale">60%</div>
                <div className="price-infor__price">
                  <div className="price-infor__price__old">1.110.000 đ</div>
                  <div className="price-infor__price__new">844.000 đ</div>
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
                <div className="facilities__more">(Nhiều tiện nghi khác)</div>
              </div>
              <hr className="line" />
              <div className="rating margin">
                <div className="rating__score">8,4</div>
                <div className="rating__reviews">231 lượt đánh giá</div>
              </div>
              <hr className="line" />
              <div className="button-wrapper">
                <Button className="cyan glow">Chọn phòng</Button>
              </div>
            </div>
            <div className="col-2">
              <div className="image margin">
                <img src={require("../assets/images/ImageBanner.png")} />
                <div className="tag">
                  <span>Resort</span>
                  <span>
                    4 <BsStarFill size={12} />
                  </span>
                </div>
                <div className="heart">
                  <BsHeartFill size={28} color="rgba(39, 43, 78, 0.32)" />
                  <BsHeart size={28} />
                </div>
              </div>
              <div className="title margin">Tên chỗ nghỉ</div>
              <hr className="line" />
              <div className="price-infor margin">
                <div className="price-infor__percent-sale">60%</div>
                <div className="price-infor__price">
                  <div className="price-infor__price__old">1.110.000 đ</div>
                  <div className="price-infor__price__new">844.000 đ</div>
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
                <div className="facilities__more">(Nhiều tiện nghi khác)</div>
              </div>
              <hr className="line" />
              <div className="rating margin">
                <div className="rating__score">8,4</div>
                <div className="rating__reviews">231 lượt đánh giá</div>
              </div>
              <hr className="line" />
              <div className="button-wrapper">
                <Button className="cyan glow">Chọn phòng</Button>
              </div>
            </div>
          </div>
          <hr className="line" />
        </div>

        <div className="section">
          <div className="section__title">Đánh giá</div>
          <div className="section__content" id="rating">
            <div className="score">
              <div className="total-score">8,4</div>
              <div className="total-reviews">
                <b>231</b> đánh giá
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
        </div>
      </div>
    </div>
  );
};
