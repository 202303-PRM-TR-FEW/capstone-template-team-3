import NavLink from "../NavLink/NavLink";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Logo to="/" />
      <Search />
      <NavLink to="/" name="Home" />
      <NavLink to="/my-projects" name="My Projects" />
      <NavLink to="/profile" name="Profile" />
    </nav>
  );
};

export default Navbar;
