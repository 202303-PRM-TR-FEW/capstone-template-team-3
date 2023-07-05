import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import NavLink from "../NavLink/NavLink";
import Button from "../Button/Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Logo to="/" />
      <Search />
      <NavLink to="/" name="Home" />
      <NavLink to="/my-projects" name="My Projects" />
      <NavLink to="/profile" name="Profile" />
      <Button type="button" name="New project" />
      <Button type="button" name="Sign in" />
    </nav>
  );
};

export default Navbar;
