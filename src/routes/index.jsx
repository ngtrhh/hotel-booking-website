// import React from "react";
// import { Route } from "react-router-dom";

// const generateRoute = ({ routes }) => {
//   return routes.map((route, index) => {
//     const Element = route.element;
//     <Route key={index} path={route.path}></Route>;
//   });
// };

// export default index;

import Home from "../pages/Home";
const publicRoutes = [{ path: "/", component: Home }];
export { publicRoutes };
