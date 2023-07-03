import Link from 'next/link';

const NavLink = ({ to, name }) => {
    return (
        <Link href={to} className="mx-5">
            {name}
        </Link>
    );
};

export default NavLink;