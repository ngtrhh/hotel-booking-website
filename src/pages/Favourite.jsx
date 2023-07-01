import React from "react";
import { HorizontalCard } from "../components/common/BookingHistory/HorizontalCard";

export const Favourite = () => {
  return (
    <div className="favourite">
      <div className="title">Yêu thích của tôi</div>
      <div className="content">
        <HorizontalCard type="favourite" />
        <HorizontalCard type="favourite" />
        <HorizontalCard type="favourite" />
        <HorizontalCard type="favourite" />
        <HorizontalCard type="favourite" />
      </div>
    </div>
  );
};
