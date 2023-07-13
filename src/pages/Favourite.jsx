import React, { useContext, useState, useEffect } from "react";
import { HorizontalCard } from "../components/common/BookingHistory/HorizontalCard";
import { AppContext } from "../Context/AppProvider";

export const Favourite = () => {
  const data = useContext(AppContext);
  const {accoms, orders, user} = data;
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(() =>{
    // const newDataToShow = orders.map((order) => {
    //   const correspondingAccom = accoms.find((accom) => accom.accomId === order.accomId && accom);
    //   if (correspondingAccom) {
    //     return { ...order, ...correspondingAccom, 
    //       accomsName: correspondingAccom.name};
    //   }
    //   return order;
    // });
    const newDataToShow = []
    let isNew = true;
    accoms.map((accom) => {
      if(user.lovedRoomsId.includes(accom.accomId)){
        newDataToShow.map((accomToShow) =>{
          if(accomToShow.accomId == accom.accomId){
            isNew = false;
          }
        });
        if(isNew){
          newDataToShow.push(accom);
        }
      }
    });
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
  useEffect(() =>{
    console.log(dataToShow);
  }, [dataToShow]);

  return (
    <div className="favourite">
      <div className="title">Yêu thích của tôi</div>
      <div className="content">
        {dataToShow.map((bookingHistory) => {
          return (<HorizontalCard DataToShow={bookingHistory} type="favourite" state="passed" />)
        })}
      </div>
    </div>
  );
};
