import NavLink from "../NavLink/NavLink";
import Logo from "../Logo/page";
const Navbar = () => {
  return (
    <nav>
      <Logo />
      <NavLink to="/" name="Home" />
      <NavLink to="/my-projects" name="My Projects" />
      <NavLink to="/profile" name="Profile" />
    </nav>
  );
};

export default Navbar;
