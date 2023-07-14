import NavLink from "../NavLink/NavLink";
import "./Logo.css";
import Link from "next/link";

const Logo = ({ name }) => {
  return (
    <div className="logo">
      <NavLink to="/welcome" name="Givingly" />
    </div>
  );
};

export default Logo;
