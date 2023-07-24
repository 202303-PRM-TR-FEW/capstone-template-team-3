import "./LargeCard.css";
import { useTranslation } from "../../../i18n/client";
import { useRouter } from "next/navigation";

const LargeCard = ({ lng }) => {
  const { t } = useTranslation(lng, "largeCard");
  const router = useRouter();
  return (
    <main>
      <div>
        <p className="project-description">
          <span className="project-text">{t("Project of the week")}</span>
        </p>
      </div>
      <div className="row">
        <div className="column">
          <div className="container-style"></div>
          <div className="image-container-style"></div>
        </div>
        <div className="column">
          <div className="project-title">
            <h1>
              {t("Help us release")}
              <br /> {t("cookbook for parents")}
              <br />
              {t("and kids")}{" "}
            </h1>
          </div>
          <div className="project-descripe">
            <p>
              {t(
                "We want to create beautiful and helpful cooking book for parents and kids to have fun in kitchen."
              )}
            </p>
          </div>
          <div>
            <div
              className="custom-container"
              data-dom-node="true"
              mode="PROTOTYPE/MODES/MODE_PLAY"
            >
              <div>
                <div className="custom-background"></div>
              </div>
            </div>
          </div>
          <div className="donation-info">
            <div className="donation-amount">
              <p className="donation-tag">{t("Raised")}:</p>
              <p>$2.000</p>
            </div>
            <div className="donation-amount">
              <p className="donation-tag">{t("Goal")}:</p>
              <p>$3.000</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LargeCard;
