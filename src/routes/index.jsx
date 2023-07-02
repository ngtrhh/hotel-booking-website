import { HomeLayout } from "../components/layout";
import { Home, Results, Detail, Login, Register, ForgotPassword,Booking } from "../pages/";
import { GetAcooms } from "../Context/AppProvider";
import { React, useState, useEffect } from "react";
import {db} from '../firebase/config'
import { connectFirestoreEmulator, limit } from 'firebase/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";



let publicRoutes = [
  { path: "/", element: Home, layout: HomeLayout },
  { path: "/results", element: Results },
  { path: "/detail", element: Detail },
  { path: "/booking", element: Booking },
  { path: "/login", element: Login, layout: null},
  { path: "/register", element: Register, layout: null},
  { path: "/forgot", element: ForgotPassword, layout: null}
];

const GetAccomsData = (setAccomsData) => {
  useEffect(() => {
    const collectionRef = collection(db, 'accoms');
    const q = query(collectionRef, limit(40));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data()
        });
      });
      setAccomsData(data);
    });

    return unsubscribe;
  }, []);
}

const PublicRoutes = () => {
  const [accomsData, setAccomsData] = useState([]);
  const [data, setData] = useState([]);
  GetAccomsData(setAccomsData);

  useEffect(() => {
    setData([
      { path: "/", element: Home, layout: HomeLayout },
      { path: "/results", element: Results},
      { path: "/booking", element: Booking },
      ...accomsData.map((accom, index) => ({
        path: `/detail/accom${index}`,
        element: () => <Detail accomData={accom} />
      })),
      { path: "/login", element: Login, layout: null },
      { path: "/register", element: Register, layout: null },
      { path: "/forgot", element: ForgotPassword, layout: null }
    ]);
  }, [accomsData]);

  useEffect(() => {
    console.log(data);
    console.log(publicRoutes);
  }, [data])
  
  return data;
};

export default PublicRoutes;

export { publicRoutes };
