import Image from "next/image";
import "./Card.css";

const Card = ({ img, title, raised, goal }) => {
  return (
    <div className="card-main">
      <div className="card-img-section ">
        <div className="card-img">
          <a href="#">
            <Image
              className="h-[9em] w-[16em]"
              src={img}
              alt={title}
              width={800}
              height={200}
            />
          </a>
        </div>
      </div>
      <div className="card-text-section">
        <a href="#">
          <h1 className="card-title ">{title}</h1>
        </a>
        <div className="card-progress-bar-main">
          <div className="card-progress-bar">
            <div className="progress-bar"></div>
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
