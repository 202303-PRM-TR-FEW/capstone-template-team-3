import Image from "next/image";
import "./Card.css";
import DonationBar from "../DonationBar/DonationBar";

const Card = ({ img, title, raised, goal }) => {
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
            <p>Raised:</p>
            <p>${raised}</p>
          </div>
          <div>
            <p>Goal:</p>
            <p>${goal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
