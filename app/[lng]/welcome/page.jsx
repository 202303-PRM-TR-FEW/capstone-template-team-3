"use client";

import NavLink from "../components/NavLink/NavLink";
import "./welcome.css";
import { useTranslation } from "@/app/i18n/client";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/loader";

export default function WelcomePage({ lng }) {
  const userStatus = useSelector((state) => state.user.status);
  const campaignStatus = useSelector((state) => state.campaign.status);
  const { t } = useTranslation(lng, "welcome");

  return userStatus === "loading" || campaignStatus === "loading" ? (
    <Loader />
  ) : (
    <div className="welcome-main-container ">
      <div
        className="welcome"
        style={{
          backgroundImage: "url(/assets/images/welcomepage.png)",
        }}
      >
        <div className="welcome-container">
          <div className="leading-left ">
            <h1 className="leading-header">Givingly</h1>
            <p className="leading-normal">
              {t("leading-normal-first")} <br></br> {t("leading-normal-second")}
            </p>
            <p className="leading-sub-normal">{t("leading-sub-normal")}</p>
            <NavLink
              data-cy="leading-button"
              to={`/${lng}/navigation`}
              style="leading-button"
            >
              {t("leading-button")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
