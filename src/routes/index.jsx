import { HomeLayout, BookingLayout } from "../components/layout";
import {
  Home,
  Results,
  Detail,
  Login,
  Register,
  ForgotPassword,
  Booking,
  BookingHistory,
  Favourite,
  Profile,
  EditProfile,
  AccountInformation,
  DetailBooking,
  EditBooking,
} from "../pages/";
import ResultBooking from "../components/common/Booking/ResultBooking";
import { GetAcooms } from "../Context/AppProvider";
import { React, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { connectFirestoreEmulator, limit } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";
import useFireStore from "../Hooks/useFireStored";

// let publicRoutes = [
//   { path: "/", element: Home, layout: HomeLayout },
//   { path: "/results", element: Results },
//   { path: "/detail", element: Detail },
//   { path: "/booking", element: Booking },
//   { path: "/booking-history", element: BookingHistory },
//   { path: "/favourite", element: Favourite },
//   { path: "/profile", element: Profile },
//   { path: "/edit-profile", element: EditProfile },
//   { path: "/login", element: Login, layout: null },
//   { path: "/register", element: Register, layout: null },
//   { path: "/forgot", element: ForgotPassword, layout: null },
// ];

const GetAccomsData = (setAccomsData) => {
  // useEffect(() => {
  //   const collectionRef = collection(db, 'accoms');
  //   const q = query(collectionRef, limit(40));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push({
  //         ...doc.data()
  //       });
  //     });
  //     setAccomsData(data);
  //   });
  //   return unsubscribe;
  // }, []);
};

const PublicRoutes = () => {
  const [accomsData, setAccomsData] = useState([]);
  const [data, setData] = useState([]);
  useFireStore("accoms", setAccomsData);

  useEffect(() => {
    setData([
      { path: "/", element: Home, layout: HomeLayout },
      { path: "/results", element: Results },
      { path: "/booking", element: Booking, layout: BookingLayout },
      ...accomsData.map((accom, index) => ({
        path: `/detail/${accom.accomId}`,
        element: () => <Detail accomData={accom} />,
      })),
      { path: "/login", element: Login, layout: null },
      { path: "/register", element: Register, layout: null },
      { path: "/forgot", element: ForgotPassword, layout: null },
      { path: "/booking-history", element: BookingHistory },
      { path: "/favourite", element: Favourite },
      { path: "/profile", element: Profile },
      { path: "/edit-profile", element: EditProfile },
      { path: "/booking/result", element: ResultBooking},
      {path: "/booking-history/detail", element: DetailBooking},
      {path: "/booking-history/edit", element: EditBooking},
      {path: "/account-info", element: AccountInformation}
    ]);
  }, [accomsData]);

  return data;
};

export default PublicRoutes;

// export { publicRoutes };
