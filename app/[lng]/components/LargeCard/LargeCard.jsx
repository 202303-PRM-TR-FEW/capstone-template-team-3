import "./LargeCard.css";
import { useTranslation } from "../../../i18n/client";
import DonationBar from "../DonationBar/DonationBar";
import Image from "next/image";

const LargeCard = ({ img, title, about, raised, goal, lng, clickAction }) => {
  const { t } = useTranslation(lng, "largeCard");
  return (
    <section onClick={clickAction} className="large-card-main">
      <p className="project-description">
        {t("Campaign of the week")}
      </p>
      <div className="row">
        <div className="large-card-img-section">
          <Image
            src={img}
            alt={title}
            width={1600}
            height={400}
            className="absolute w-[95%] h-[95%] rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>
        <div className="project-info">
          <div>
            <h1 className="project-title">
              {title}
            </h1>
            <p className="project-describe">
              {about}
            </p>
          </div>
          <div
            className="custom-container"
            data-dom-node="true"
            mode="PROTOTYPE/MODES/MODE_PLAY"
          >
            <div>
              <DonationBar raised={raised} goal={goal} />
            </div>
            <div className="donation-info">
              <div className="donation-amount">
                <p className="donation-tag">{t("Raised")}:</p>
                <p className="donation-amount">${raised}</p>
              </div>
              <div className="donation-amount">
                <p className="donation-tag">{t("Goal")}:</p>
                <p className="donation-amount">${goal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LargeCard;
