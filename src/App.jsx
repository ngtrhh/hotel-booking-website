import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { MainLayout } from "./components/layout";
import { Fragment } from "react";
import AuthProvider from "./Context/AuthProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {publicRoutes.map((route, index) => {
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
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
