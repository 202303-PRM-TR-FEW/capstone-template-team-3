"use client"

import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import NavLink from "../NavLink/NavLink";
import Button from "../Button/Button";
import { useState } from "react";
import "./Navbar.css"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  return (
    isLoggedIn ? (
      <div className="bg-theme">
        <nav className="container mx-auto flex justify-between items-center py-5">
          <div className="flex justify-between items-center relative">
            <Logo to="/" />
          </div>
          <div className="absolute left-1/4">
            <Search />
          </div>
          <div className="flex justify-between items-center">
            <NavLink to="/" name="Home" />
            <NavLink to="/my-projects" name="My Projects" style="ms-10" />
            <NavLink to="/profile" name="Profile" style="ms-10" />
            <Button type="button" name="New project" style="ms-10 navbar-button" />
            <Button type="button" name="Sign in" style="ms-5 navbar-button" />
          </div>
        </nav>
      </div>
    ) : (
      <div className="bg-theme">
        <nav className="container mx-auto flex justify-between items-center py-5">
          <div className="flex justify-between items-center relative">
            <Logo to="/" />
          </div>
          <div className="absolute left-1/4">
            <Search />
          </div>
          <div className="flex justify-between items-center">
            <NavLink to="/" name="Home" />
            <Button type="button" name="Sign in" style="ms-5 navbar-button" />
          </div>
        </nav>
      </div>
    )
  );
};

export default Navbar;
