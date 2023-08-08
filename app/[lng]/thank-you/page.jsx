"use client";

import NavLink from "../components/NavLink/NavLink";
import "./thank-you.css";
import thankyouPic from "public/assets/images/thankyou.png";
import Image from "next/image";
import { useTranslation } from "../../i18n/client";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/loader";

const ThankYouPage = ({ lng }) => {
  const userStatus = useSelector((state) => state.user.status)
  const campaignStatus = useSelector((state) => state.campaign.status)
  const { t } = useTranslation(lng, "thankYou");

  return (
    userStatus === "loading" || campaignStatus === "loading" ? (<Loader />) : (
      <div className="ty-bg">
        <Image
          className="ty-img"
          src={thankyouPic}
          alt="Illustration of a hand holding green hearts near books."
          priority={true}
          width={850}
          height={400}
        />
        <div className="ty-container">
          <h2 className="ty-header">{t("Thank you")}</h2>
          <h3 className="ty-sub-normal">{t("for supporting us!")}</h3>
          <div className="md:space-x-6 ty-buttons">
            <NavLink to="/campaigns" style="ty-first-button">
              {t("Make another donation")}
            </NavLink>
            <NavLink to="/my-campaigns" style="ty-second-button">
              {t("Go to My Campaigns")}
            </NavLink>
          </div>
        </div>
      </div>
    )
  );
};

export default ThankYouPage;
