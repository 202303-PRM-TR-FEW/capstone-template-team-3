"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import NavLink from "../NavLink/NavLink";
import Button from "../Button/Button";
import "./Navbar.css";
import { HiSearchCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "app/firebase/firebase.jsx";
import {
  userSignOut,
  returnToInitialState,
} from "@/app/lib/features/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "../../../i18n/client";
import { openModal, closeModal } from "@/app/lib/features/kickOffModalSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAllCampaigns } from "@/app/lib/features/campaignSlice";
import { usePathname } from "next/navigation";

const Navbar = ({ lng }) => {
  const [user, loading] = useAuthState(auth);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [isHidden, setIsHidden] = useState("xl:hidden");
  const router = useRouter();
  const dispatch = useDispatch();
  const allCampaigns = useSelector((state) => state.campaign.allCampaigns);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation(lng, "navbar");
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setToggleDropdown((prevState) => !prevState);
  };

  const handleToggleSearch = () => {
    setToggleSearch((prevState) => !prevState);
  };

  const handleLogin = () => {
    router.push(`/${lng}/sign-in`);
  };

  const handleLogout = async () => {
    await dispatch(userSignOut());
    await dispatch(returnToInitialState());
    router.push(`/${lng}`);
    toast.success(t("Signed out successfully."), {
      toastId: "sign-out-succeeded",
    });
  };

  const handleModalToggle = () => {
    router.push(`/${lng}/my-campaigns`);
    dispatch(openModal());
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSuggestionClick = (campaignId) => {
    router.push(`/${lng}/campaigns/${campaignId}`);
  };

  const suggestionCampaigns = allCampaigns.filter((campaign) => {
    return campaign.data.projectName
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllCampaigns());
  }, []);

  return (
    <div className="bg-theme">
      <nav className="container mx-auto flex flex-row justify-between items-center py-5 px-5 whitespace-nowrap">
        <div className="flex justify-between items-center">
          <Logo lng={lng} />
        </div>
        <div className="relative">
          <HiSearchCircle
            className={isHidden}
            size={40}
            title="Search"
            onClick={() => {
              handleToggleSearch();
              setToggleDropdown(false);
            }}
          />
          {isHidden === "xl:hidden" && !toggleSearch ? (
            <Search
              style="bg-accent text-gray-900 rounded-lg focus:ring-0 w-[20rem] p-2.5 border-0 h-11 ms-8 hidden xl:block"
              onSearch={handleSearch}
              suggestions={suggestionCampaigns}
              onSuggestionClick={handleSuggestionClick}
            />
          ) : (
            <Search
              style="bg-accent text-gray-900 text-[12px] lg:text-[14px] rounded-lg focus:ring-0 w-[12.4rem] lg:w-[14rem] p-2.5 border-0 h-11 -left-20 lg:-left-24 inset-y-[3.2rem] sm:inset-y-10 absolute drop-shadow-2xl"
              onSearch={handleSearch}
              suggestions={suggestionCampaigns}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
        <div className="lg:flex lg:justify-between lg:items-center hidden">
          <NavLink
            to={`/${lng}/campaigns`}
            name={t("Home")}
            style={
              pathname === `/${lng}/campaigns`
                ? "underline underline-offset-8 decoration-4 lg:ms-0 xl:ms-8"
                : "lg:ms-0 xl:ms-8 hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-accent"
            }
          />
          {user && (
            <>
              <NavLink
                to={`/${lng}/my-campaigns`}
                name={t("My Campaigns")}
                style={
                  pathname === `/${lng}/my-campaigns`
                    ? "underline underline-offset-8 decoration-4 lg:ms-4 2xl:ms-8"
                    : "lg:ms-4 2xl:ms-8 hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-accent"
                }
              />
              <NavLink
                to={`/${lng}/profile`}
                name={t("Profile")}
                style={
                  pathname === `/${lng}/profile`
                    ? "underline underline-offset-8 decoration-4 lg:ms-4 2xl:ms-8"
                    : "lg:ms-4 2xl:ms-8 hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-accent"
                }
              />
              <Button
                type="button"
                name={t("New Campaign")}
                style="lg:ms-4 2xl:ms-8 navbar-button"
                clickAction={handleModalToggle}
              />
            </>
          )}
          <Button
            type="button"
            name={user ? t("Sign out") : t("Sign in")}
            style="ms-4 navbar-button"
            clickAction={!user ? () => handleLogin() : () => handleLogout()}
          />
        </div>
        <div className="lg:hidden relative">
          <Button
            type="button"
            style="relative group"
            clickAction={() => {
              setToggleSearch(false);
              handleToggleDropdown();
            }}
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-accent-black ring-0 ring-accent hover:ring-4 group-focus:ring-4 ring-opacity-100 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className="bg-theme h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10"></div>
                <div className="bg-theme h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75"></div>
                <div className="bg-theme h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150"></div>
                <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                  <div className="absolute bg-theme h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                  <div className="absolute bg-theme h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
                </div>
              </div>
            </div>
          </Button>
          {toggleDropdown && (
            <div className="bg-accent rounded-lg min-w-max min-h-fit absolute inset-y-14 right-5 p-4 flex flex-col text-sm items-stretch justify-center text-center drop-shadow-2xl z-10"
              ref={dropdownRef}>
              <NavLink
                to="/campaigns"
                name={t("Home")}
                style={
                  pathname === `/${lng}/campaigns`
                    ? "underline underline-offset-[6px] decoration-2 mb-2"
                    : "mb-2 hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-accent"
                }
                clickAction={() => setToggleDropdown(false)}
              />
              {user && (
                <>
                  <NavLink
                    to={`/${lng}/my-campaigns`}
                    name={t("My Campaigns")}
                    style={
                      pathname === `/${lng}/my-campaigns`
                        ? "underline underline-offset-[6px] decoration-2 mb-2"
                        : "mb-2 hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-accent"
                    }
                    clickAction={() => setToggleDropdown(false)}
                  />
                  <NavLink
                    to={`/${lng}/profile`}
                    name={t("Profile")}
                    style={
                      pathname === `/${lng}/profile`
                        ? "underline underline-offset-[6px] decoration-2 mb-2"
                        : "mb-2 hover:underline hover:underline-offset-8 hover:decoration-4 hover:decoration-accent"
                    }
                    clickAction={() => setToggleDropdown(false)}
                  />
                  <Button
                    type="button"
                    name={t("New Campaign")}
                    style="navbar-button mb-2"
                    clickAction={() => { handleModalToggle(), setToggleDropdown(false) }}
                  />
                </>
              )}
              <Button
                type="button"
                name={user ? t("Sign out") : t("Sign in")}
                style="navbar-button"
                clickAction={!user ? () => { handleLogin(), setToggleDropdown(false) } : () => { handleLogout(), setToggleDropdown(false) }}
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
