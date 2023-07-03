import "./Logo.css";
import Link from "next/link";

const Logo = ({ to }) => {
  return (
    <div className="logo">
      <Link href={to}>
        <p>Givingly</p>
      </Link>
    </div>
  );
};

export default Logo;
