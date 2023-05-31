import Header from "../common/Header";
import Footer from "../common/Footer";

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default MainLayout;
