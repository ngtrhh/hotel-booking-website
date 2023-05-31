import { HomeLayout } from "../components/layout";
import Home from "../pages/Home";
import Results from "../pages/Results";

const publicRoutes = [
  { path: "/", element: Home, layout: HomeLayout },
  { path: "/results", element: Results },
];
export { publicRoutes };
