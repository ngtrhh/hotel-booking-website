import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes, { publicRoutes } from "./routes";
import { MainLayout } from "./components/layout";
import { Fragment } from "react";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import { FloatButton } from "antd";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const meow = PublicRoutes();
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <ScrollToTop />
          <Routes>
            {meow.map((route, index) => {
              const Page = route.element;
              let Layout = MainLayout;

              if (route.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                      <FloatButton.BackTop />
                    </Layout>
                  }
                ></Route>
              );
            })}
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
