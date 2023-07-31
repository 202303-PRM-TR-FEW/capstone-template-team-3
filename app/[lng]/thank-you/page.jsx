"use client";

import NavLink from "../../components/NavLink/NavLink";
import "./thank-you.css";
import thankyouPic from "public/assets/images/thankyou.png";
import Image from "next/image";
import { useTranslation } from "../../i18n/client";

const ThankYouPage = ({ lng }) => {
  const { t } = useTranslation(lng, "thankYou");

  return (
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
          <NavLink to="/navigation" style="ty-first-button">
            {t("Make another donation")}
          </NavLink>
          <NavLink to="/campaigns" style="ty-second-button">
            {t("Go to homepage")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
