import Link from "next/link";

const NavLink = ({ to, name, children, style }) => {
  return (
    <Link href={to} className={style}>
      {name}
      {children}
    </Link>
  );
};

export default NavLink;
