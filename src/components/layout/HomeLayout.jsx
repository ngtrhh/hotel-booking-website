import Header from "../common/Header";
import Footer from "../common/Footer";

const HomeLayout = (props) => {
  return (
    <div className="home-layout">
      <Header />
      <div className="home-layout__content">
        {props.children} <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
