import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="main">{props.children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
