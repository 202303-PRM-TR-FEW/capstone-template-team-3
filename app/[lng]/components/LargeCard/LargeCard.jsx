import "./LargeCard.css";
import { useTranslation } from "../../../i18n/client";
import DonationBar from "../DonationBar/DonationBar";
import Image from "next/image";

const LargeCard = ({ img, title, about, raised, goal, lng, clickAction }) => {
  const { t } = useTranslation(lng, "largeCard");
  return (
    <main onClick={clickAction}>
      <div>
        <p className="project-description">
          <span className="project-text">{t("Campaign of the week")}</span>
        </p>
      </div>
      <div className="row">
        <div className="column">
          <div className="card-img-section">
            <Image
              className="h-[9em] w-[16em]"
              src={img}
              alt={title}
              width={800}
              height={200}
            />
          </div>
        </div>
        <div className="column">
          <div className="project-title">
            <h1>
              {title}
            </h1>
          </div>
          <div className="project-descripe">
            <p>
              {about}
            </p>
          </div>
          <div>
            <div
              className="custom-container"
              data-dom-node="true"
              mode="PROTOTYPE/MODES/MODE_PLAY"
            >
              <div>
                <DonationBar raised={raised} goal={goal} />
              </div>
            </div>
          </div>
          <div className="donation-info">
            <div className="donation-amount">
              <p className="donation-tag">{t("Raised")}:</p>
              <p>${raised}</p>
            </div>
            <div className="donation-amount">
              <p className="donation-tag">{t("Goal")}:</p>
              <p>${goal}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LargeCard;
