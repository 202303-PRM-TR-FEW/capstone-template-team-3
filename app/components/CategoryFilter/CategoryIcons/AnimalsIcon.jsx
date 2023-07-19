import { FaPaw } from "react-icons/fa6";
import "../CategoryIcons/CategoryIcons.css";

const AnimalsIcon = () => {
  return (
    <div className="icon-main">
      <FaPaw
        size={40}
        className="icon"
      />
      <span className="text-xs">Animals</span>
    </div>
  );
};

export default AnimalsIcon;
