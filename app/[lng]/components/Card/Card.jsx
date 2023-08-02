import Image from "next/image";
import "./Card.css";
import { useTranslation } from "../../../i18n/client";
import DonationBar from "../DonationBar/DonationBar";

const Card = ({ img, title, raised, goal, lng }) => {
  const { t } = useTranslation(lng, "largeCard");
  return (
    <div className="card-main">
      <div className="card-img-section ">
        <div className="card-img">
          <Image
            className="h-[9em] w-[16em]"
            src={img}
            alt={title}
            width={800}
            height={200}
          />
        </div>
      </div>
      <div className="card-text-section">
        <h1 className="card-title ">{title}</h1>
        <div className="card-progress-bar-main">
          <div className="card-progress-bar">
            <DonationBar raised={raised} goal={goal} />
          </div>
        </div>

        <div className="card-money-section">
          <div>
            <p>{t("Raised")}:</p>
            <p>${raised}</p>
          </div>
          <div>
            <p>{t("Goal")}:</p>
            <p>${goal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
