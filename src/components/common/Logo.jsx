import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

const Logo = (props) => {
  return (
    <Link to="/">
      {props.small ? (
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "auto",
            height: "32px",
          }}
        />
      ) : (
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "auto",
            height: "56px",
          }}
        />
      )}
    </Link>
  );
};

export default Logo;
