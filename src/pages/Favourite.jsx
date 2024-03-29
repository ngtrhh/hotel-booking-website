import React, { useContext, useState, useEffect } from "react";
import { HorizontalCard } from "../components/common/BookingHistory/HorizontalCard";
import { AppContext } from "../Context/AppProvider";
import Helmet from "../components/common/Helmet";

export const Favourite = () => {
  const data = useContext(AppContext);
  const { accoms, orders, user, isLoggedIn} = data;
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(() => {
    // const newDataToShow = orders.map((order) => {
    //   const correspondingAccom = accoms.find((accom) => accom.accomId === order.accomId && accom);
    //   if (correspondingAccom) {
    //     return { ...order, ...correspondingAccom,
    //       accomsName: correspondingAccom.name};
    //   }
    //   return order;
    // });
    const newDataToShow = [];
    let isNew = true;

    if (user) {
      accoms.map((accom) => {
        if (user.lovedRoomsId.includes(accom.accomId)) {
          newDataToShow.map((accomToShow) => {
            if (accomToShow.accomId === accom.accomId) {
              isNew = false;
            }
          });
          if (isNew) {
            newDataToShow.push(accom);
          }
        }
        isNew = true;
      });
    }
    console.log(newDataToShow);
    setDataToShow(newDataToShow);
  }, [accoms, orders, user]);
  // const handleSortOptionClick = (index) => {
  //   const updatedSortOption = [...sortOption];
  //   updatedSortOption.forEach((option, i) => {
  //     option.selected = i === index;
  //   });
  //   setSortOption(updatedSortOption);
  // };
  useEffect(() => {
    console.log(dataToShow);
  }, [dataToShow]);

  return (
    <Helmet title="Danh sách yêu thích">
      <div className="favourite">
        <div className="title">Yêu thích của tôi</div>
        <div className="content">
          {dataToShow.length == 0 ? (
            <div className="unlogged">
              {!isLoggedIn
                ? "Đăng nhập để lưu các chỗ nghỉ mà bạn quan tâm!"
                : "Danh sách yêu thích của bạn đang trống."}
              <img
                src={require("../assets/images/EmptyFavourite.png")}
                style={{ width: "50%" }}
              />
            </div>
          ) : (
            dataToShow.map((data) => {
              return (
                <HorizontalCard
                  DataToShow={data}
                  type="favourite"
                  state="passed"
                />
              );
            })
          )}
        </div>
      </div>
    </Helmet>
  );
};
