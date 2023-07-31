import NavLink from "../NavLink/NavLink";
import "./Logo.css";

const Logo = ({ lng }) => {
  return (
    <div className="logo">
      <NavLink to={`/${lng}`} name="Givingly" />
    </div>
  );
};

export default Logo;