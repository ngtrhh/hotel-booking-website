import { HomeLayout } from "../components/layout";
import { Home, Results, Detail, Login, Register } from "../pages/";

const publicRoutes = [
  { path: "/", element: Home, layout: HomeLayout },
  { path: "/results", element: Results },
  { path: "/detail", element: Detail },
  { path: "/login", element: Login, layout: null},
  { path: "/register", element: Register, layout: null}
];
export { publicRoutes };
