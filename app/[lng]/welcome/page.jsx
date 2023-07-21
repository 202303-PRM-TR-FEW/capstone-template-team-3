import NavLink from "../../components/NavLink/NavLink";
import "./welcome.css";
import { useTranslation } from "../../i18n";

export default async function WelcomePage({ lng, l }) {
  const { t } = await useTranslation(lng, "welcome");

  return (
    <div className="welcome-main-container ">
      <div
        className="welcome"
        style={{
          backgroundImage: "url(/welcomepage.png)",
        }}
      >
        <div className="welcome-container">
          <div className="leading-left ">
            <h1 className="leading-header">Givingly</h1>
            <p className="leading-normal">
              {t("leading-normal-first")} <br></br> {t("leading-normal-second")}
            </p>
            <p className="leading-sub-normal">
            {t("leading-sub-normal")}            
            </p>
            <NavLink to={`/${lng}/navigation`} style="leading-button">
              {t("leading-button")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
