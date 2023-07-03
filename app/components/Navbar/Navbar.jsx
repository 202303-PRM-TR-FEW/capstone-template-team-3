import NavLink from "../NavLink/NavLink";

//Comment to be deleted

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