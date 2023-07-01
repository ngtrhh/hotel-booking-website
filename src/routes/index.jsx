import { HomeLayout } from "../components/layout";
import { Home, Results, Detail, Login, Register, ForgotPassword,Booking } from "../pages/";

const publicRoutes = [
  { path: "/", element: Home, layout: HomeLayout },
  { path: "/results", element: Results },
  { path: "/detail", element: Detail },
  { path: "/booking", element: Booking },
  { path: "/login", element: Login, layout: null},
  { path: "/register", element: Register, layout: null},
  { path: "/forgot", element: ForgotPassword, layout: null}
];
export { publicRoutes };
