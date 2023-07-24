import NavLink from "../NavLink/NavLink";
import "./Logo.css";


const Logo = ({ name }) => {
  return (
    <div className="logo">
      <NavLink to="/welcome" name="Givingly" />
    </div>
  );
};

export default Logo;