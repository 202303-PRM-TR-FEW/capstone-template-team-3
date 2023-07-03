import NavLink from "../NavLink/NavLink";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <Logo to="/" />
      <NavLink to="/" name="Home" />
      <NavLink to="/my-projects" name="My Projects" />
      <NavLink to="/profile" name="Profile" />
    </nav>
  );
};

export default Navbar;
