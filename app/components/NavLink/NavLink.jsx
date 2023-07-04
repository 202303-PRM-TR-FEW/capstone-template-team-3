import Link from "next/link";

const NavLink = ({ to, name, children }) => {
  return (
    <Link href={to}>
      {name}
      {children}
    </Link>
  );
};

export default NavLink;
