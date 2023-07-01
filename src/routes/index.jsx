import { HomeLayout } from "../components/layout";
import { Home, Results, Detail, Booking } from "../pages/";

const publicRoutes = [
  { path: "/", element: Home, layout: HomeLayout },
  { path: "/results", element: Results },
  { path: "/detail", element: Detail },
  { path: "/booking", element: Booking },
];
export { publicRoutes };
