import Image from "next/image";
import "./Card.css";
import { useTranslation } from "../../../i18n/client";
import DonationBar from "@/app/[lng]/components/DonationBar/DonationBar";

const Card = ({ img, title, raised, goal, lng, clickAction, ...props }) => {
  const { t } = useTranslation(lng, "largeCard");
  return (
    <div
      className="card-main cursor-pointer transform transition-transform duration-500 ease-in-out hover:shadow-gray-400 hover:drop-shadow-2xl hover:scale-110 "
      onClick={clickAction}
      data-cy={props.dataCy}
    >
      <div className="card-img-section">
        <div className="card-img">
          <Image
            className="h-[9em] w-[16em] rounded-lg "
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
          <DonationBar raised={raised} goal={goal} />
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
