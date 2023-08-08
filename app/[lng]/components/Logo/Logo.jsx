import NavLink from "../NavLink/NavLink";
import "./Logo.css";

const Logo = ({ lng, style }) => {
  return (
    <div className="logo">
      <NavLink to={`/${lng}`} name="Givingly" style={style} />
    </div>
  );
};

export default Logo;
