"use client"

import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import NavLink from "../NavLink/NavLink";
import Button from "../Button/Button";
import { useState } from "react";
import "./Navbar.css"
import { HiSearchCircle } from "react-icons/hi"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)
  const [isHidden, setIsHidden] = useState("xl:hidden")

  const handleToggleDropdown = () => {
    setToggleDropdown((prevState) => !prevState)
  }

  const handleToggleSearch = () => {
    setToggleSearch((prevState) => !prevState)
  }

  return (
    <div className="bg-theme">
      <nav className="container mx-auto flex flex-row justify-between items-center py-5 px-5 whitespace-nowrap">
        <div className="flex justify-between items-center">
          <Logo to="/" />
        </div>
        <div className="relative">
          <HiSearchCircle className={isHidden} size={40} onClick={() => {
            handleToggleSearch();
            setToggleDropdown(false);
          }} />
          {isHidden === "xl:hidden" && !toggleSearch ? (
            <Search style="bg-accent text-gray-900 rounded-lg focus:ring-0 w-[20rem] p-2.5 border-0 h-11 ms-10 hidden xl:block" />
          ) : (
            <Search style="bg-accent text-gray-900 rounded-lg focus:ring-0 w-[14rem] p-2.5 border-0 h-11 -left-24 absolute drop-shadow-2xl" />
          )}
        </div>
        <div className="lg:flex lg:justify-between lg:items-center hidden">
          <NavLink to="/" name="Home" style="sm:ms-10 lg:ms-5 lg:ms-10" />
          {isLoggedIn && (
            <>
              <NavLink to="/my-projects" name="My Projects" style="sm:ms-10 md:ms-5 lg:ms-10" />
              <NavLink to="/profile" name="Profile" style="sm:ms-10 md:ms-5 lg:ms-10" />
              <Button type="button" name="New project" style="sm:ms-10 md:ms-5 lg:ms-10 navbar-button" />
            </>
          )}
          <Button type="button" name={isLoggedIn ? "Sign out" : "Sign in"} style="ms-5 navbar-button" />
        </div>
        <div className="lg:hidden relative">
          <Button type="button" style="relative group" clickAction={() => {
            setToggleSearch(false);
            handleToggleDropdown();
            console.log(toggleSearch)
          }}>
            <div
              className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-cyan-600 ring-0 ring-cyan-800 hover:ring-4 group-focus:ring-4 ring-opacity-20 duration-200 shadow-md">
              <div
                className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div
                  className="bg-black h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10">
                </div>
                <div
                  className="bg-black h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75">
                </div>
                <div
                  className="bg-black h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150">
                </div>

                <div
                  className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                  <div
                    className="absolute bg-black h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45">
                  </div>
                  <div
                    className="absolute bg-black h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45">
                  </div>
                </div>
              </div>
            </div>
          </Button>
          {toggleDropdown && (
            <div className="bg-accent rounded-lg min-w-max min-h-fit absolute inset-y-12 right-5 p-4 flex flex-col text-sm items-stretch justify-center text-center drop-shadow-2xl">
              <NavLink to="/" name="Home" style="mb-2" />
              {isLoggedIn && (
                <>
                  <NavLink to="/my-projects" name="My Projects" style="mb-2" />
                  <NavLink to="/profile" name="Profile" style="mb-2" />
                  <Button type="button" name="New project" style="navbar-button mb-2" />
                </>
              )}
              <Button type="button" name={isLoggedIn ? "Sign out" : "Sign in"} style="navbar-button" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
