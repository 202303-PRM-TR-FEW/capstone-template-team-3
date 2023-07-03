import NavLink from "../NavLink/NavLink";
const Navbar = () => {
    return (
        <nav>
            <NavLink to='/' name='Home'/>
            <NavLink to='/my-projects' name='My Projects'/>
            <NavLink to='/profile' name='Profile'/>
        </nav>
    );
};

export default Navbar;