import Link from "next/link";

const NavLink = ({ to, name, children, style, clickAction }) => {
  return (
    <Link href={to} className={style} onClick={clickAction}>
      {name}
      {children}
    </Link>
  );
};

export default NavLink;
